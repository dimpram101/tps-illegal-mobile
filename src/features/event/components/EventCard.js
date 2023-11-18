import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";

const EventCard = ({ event, navigation }) => {
  const isStartAndEndAtSameDay = moment(event.start_at).isSame(
    event.end_at,
    "day"
  );

  return (
    <React.Fragment>
      <View style={styles.eventCard}>
        <View style={styles.eventImageSection}>
          <Image
            resizeMode="cover"
            source={{
              uri: "https://i.pinimg.com/originals/09/6a/35/096a35453660aa9b83ba4ab6d9182d61.jpg",
            }}
            style={styles.eventImage}
          />
        </View>
        <View style={styles.eventTextMainSection}>
          <View style={styles.eventTextRowSection}>
            <Text style={styles.eventTitleText} numberOfLines={1}>
              {event.name}
            </Text>
          </View>
          <View style={styles.eventTextRowSection}>
            <Text style={styles.eventText}>{event.gather_point}</Text>
            <Text style={[styles.eventText, styles.eventRightSectionText]}>
              Kuota : {event._count.user_join_event}/{event.quota}
            </Text>
          </View>
          <View style={styles.eventTextRowSection}>
            <Text style={styles.eventText}>
              {isStartAndEndAtSameDay
                ? moment(event.start_at).format("DD-MM-YYYY")
                : moment(event.start_at).format("DD-MM-YYYY") -
                  moment(event.end_at).format("DD-MM-YYYY")}
            </Text>
            <Pressable
              style={styles.eventDetailButton}
              onPress={() =>
                navigation.navigate("EventDetail", {
                  eventId: event.id,
                })
              }
            >
              <Text style={styles.eventDetailButtonText}>Lihat Detail</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  eventCard: {
    height: 330,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
    borderWidth: 0.5,
    elevation: 2,
    borderColor: "#2FC8B0",
    borderRadius: 12,
  },
  eventImageSection: {
    height: 230,
    width: "100%",
    borderBottomWidth: 1,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  eventTextMainSection: {
    height: 100,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  eventTextRowSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventDetailButton: {
    backgroundColor: "#2FC8B0",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  eventTitleText: {
    fontSize: 16,
    flex: 1,
    fontWeight: "500",
  },
  eventText: {
    fontSize: 12,
    flex: 1,
    fontWeight: "400",
  },
  eventRightSectionText: {
    textAlign: "right",
  },
  eventDetailButtonText: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
  },
});
