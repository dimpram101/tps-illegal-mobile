import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../../../api/fetch";
import { BASE_URL } from "../../../api/api";

const WIDTH = Dimensions.get("window").width;

const EventIndex = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    getAllEvents((withImage = true), (withUsers = false), (withTPS = false))
      .then((data) => setEvents(data))
      .catch((error) => console.log(error.response.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  if (isLoading) {
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
    <ScrollView
      contentContainerStyle={[
        styles.mainContainer,
        events.length < 1 && {
          flex: 1,
        },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            fetchData();
          }}
        />
      }
    >
      <Carousel
        width={WIDTH}
        height={WIDTH / 1.8}
        pagingEnabled
        autoPlayInterval={2000}
        snapEnabled
        loop
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        autoPlay
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              borderRadius: 24,
              backgroundColor: "rgba(255,255,255,0.8)",
              justifyContent: "space-between",
            }}
          >
            <Image
              resizeMode="cover"
              source={{
                uri: `${BASE_URL}/images/bersih${index % 2 === 0 ? '1' : '2'}.jpg`,
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 23,
              }}
            />
          </View>
        )}
      />

      <View style={styles.contentContainer}>
        {!events.length < 1 ? (
          <React.Fragment>
            <Text style={styles.eventTitle}>Ikut Volunteer, yuk!</Text>
            {events.map((event) => (
              <EventCard event={event} key={event.id} navigation={navigation} />
            ))}
          </React.Fragment>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.noDataTitle}>
              Saat ini belum ada Event Volunteer
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default EventIndex;

const styles = StyleSheet.create({
  mainContainer: {},
  contentContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  noDataTitle: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "400",
    textAlign: "center",
  },
  // eventTextLeftSection: {
  //   flex: 1,
  //   alignItems: "flex-start",
  //   justifyContent: "space-between",
  // },
  // eventTextRightSection: {
  //   flex: 1,
  //   alignItems: "flex-end",
  //   justifyContent: "space-between",
  // },
});

{
  /* <View style={styles.eventTextLeftSection}>
    <Text style={{ fontSize: 16, fontWeight: "500" }}>
      Event Title
    </Text>
    <Text style={styles.eventText}>Address</Text>
    <Text style={styles.eventText}>Lokasi</Text>
  </View>
  <View style={styles.eventTextRightSection}>
    <Text style={{ fontSize: 12, fontWeight: "400" }}>Tanggal</Text>
    <Text style={{ fontSize: 12, fontWeight: "400" }}>Jumlah</Text>
    <Text style={{ fontSize: 12, fontWeight: "400" }}>
      Lihat Detail
    </Text>
  </View> */
}
