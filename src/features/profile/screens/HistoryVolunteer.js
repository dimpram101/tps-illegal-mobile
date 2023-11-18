import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getUserVolunteerHistory } from "../../../api/fetch";
import VolunteerCard from "../components/VolunteerCard";

const HistoryVolunteer = ({ navigation }) => {
  const { authState } = useAuth();
  const [volunteerData, setVolunteerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserVolunteerHistory(authState.userId)
      .then((data) => setVolunteerData(data))
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2FC8B0" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {volunteerData.length === 0 ? (
        <Text style={{ textAlign: "center" }}>Belum ada riwayat volunteer</Text>
      ) : (
        volunteerData.map((volunteer) => (
          <VolunteerCard
            volunteer={volunteer}
            navigation={navigation}
            key={volunteer.id}
          />
        ))
      )}
    </ScrollView>
  );
};

export default HistoryVolunteer;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 4,
  },
});
