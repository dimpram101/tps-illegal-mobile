import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getTPSHistory } from "../../../api/fetch";
import TPSCard from "../components/TPSCard";

const HistoryTPS = ({ navigation }) => {
  const [tpsData, setTpsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTPSHistory()
      .then((data) => {
        setTpsData(data);
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#2FC8B0" size="large" />
      </View>
    );

  if (tpsData.length < 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontStyle: "italic",
          }}
        >
          Belum ada data yang kamu masukkan...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tpsData.map((tps) => (
        <TPSCard key={tps.id} tps={tps} navigation={navigation} />
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
