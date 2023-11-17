import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllTPS } from "../../../api/fetch";
import TPSCard from "../components/TPSCard";

const HistoryTPS = ({ navigation }) => {
  const [tpsData, setTpsData] = useState([]);

  useEffect(() => {
    getAllTPS()
      .then((data) => setTpsData(data))
      .catch((err) => console.log(err.response.data));
  }, []);

  if (tpsData.length < 1) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tpsData.map((tps) => (
        <TPSCard key={tps.id} tps={tps} navigation={navigation}/>
      ))}
    </ScrollView>
  );
};

export default HistoryTPS;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    gap: 4,
  },
});
