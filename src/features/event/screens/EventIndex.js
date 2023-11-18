import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

const EventIndex = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Event Index</Text>
    </ScrollView>
  );
};

export default EventIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
