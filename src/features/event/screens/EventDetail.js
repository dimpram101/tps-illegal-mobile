import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getEventById } from "../../../api/fetch";
import moment from "moment";

const EventDetail = ({ route }) => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const eventId = route.params.eventId;

  useEffect(() => {
    getEventById(
      eventId,
      (withImage = true),
      (withUsers = false),
      (withTPS = true)
    )
      .then((data) => setEvent(data))
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !event) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <ActivityIndicator color="#2FC8B0" size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBanner}>
        <Image
          resizeMode="cover"
          source={{
            uri: "https://i.pinimg.com/originals/09/6a/35/096a35453660aa9b83ba4ab6d9182d61.jpg",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.eventTitleText}>{event.name}</Text>
            {event.status === "CLOSED" && (
              <View style={styles.eventClosedBox}>
                <Text style={styles.eventClosedText}>{"TUTUP"}</Text>
              </View>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.eventText}>Deskripsi</Text>
              <View style={styles.eventDescriptionTextBox}>
                <Text style={styles.eventDescriptionText}>{event.notes}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.eventText}>Tanggal Mulai</Text>
              <View style={styles.eventDescriptionTextBox}>
                <Text style={styles.eventDescriptionText}>
                  {moment(event.start_at).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.eventText}>Tanggal Selesai</Text>
              <View style={styles.eventDescriptionTextBox}>
                <Text style={styles.eventDescriptionText}>
                  {moment(event.end_at).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.eventText}>Titik Kumpul</Text>
              <View style={styles.eventDescriptionTextBox}>
                <Text style={styles.eventDescriptionText}>
                  {event.gather_point}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.eventText}>Kuota</Text>
              <View style={styles.eventDescriptionTextBox}>
                <Text style={styles.eventDescriptionText}>
                  {event._count.user_join_event}/{event.quota}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.eventText}>Alamat</Text>
              <View style={styles.eventDescriptionTextBox}>
                <Text style={styles.eventDescriptionText}>
                  {event.tps.address}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.mapView}>
            <MapView
              style={{ width: "100%", height: "100%" }}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: event.tps.latitude,
                longitude: event.tps.longitude,
                latitudeDelta: 0.028,
                longitudeDelta: 0.0024,
              }}
              mapType="standard"
            >
              <Marker
                coordinate={{
                  latitude: -0.45689,
                  longitude: 117.00183,
                }}
              />
            </MapView>
          </View>

          <Button
            mode="elevated"
            style={styles.button}
            textColor="white"
            disabled={
              event._count.user_join_event === event.quota ||
              isLoading ||
              event.status === "CLOSED" ||
              new Date(event.start_at) >= new Date()
            }
          >
            Daftar Volunteer
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    // height: "100%"
  },
  imageBanner: {
    width: "100%",
    height: 260,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.6,
    borderColor: "#2FC8B0",
    padding: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  eventText: {
    fontSize: 16,
    fontWeight: "400",
  },
  eventClosedBox: {
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  eventClosedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  eventTitleText: {
    fontSize: 20,
    fontWeight: "500",
  },
  eventDescriptionTextBox: {
    backgroundColor: "#F2F2F2",
    padding: 8,
    borderRadius: 4,
    flexGrow: 1,
  },
  eventDescriptionText: {
    fontSize: 14,
    fontWeight: "400",
  },
  mapView: {
    width: "100%",
    height: 250,
  },
  button: {
    width: "100%",
    backgroundColor: "#2FC8B0",
    borderRadius: 4,
    padding: 0,
  },
});
