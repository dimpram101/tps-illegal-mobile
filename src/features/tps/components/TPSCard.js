import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TPSCard = ({ backgroundColor }) => {
  return (
    <View
      style={[
        styles.app,
        {
          backgroundColor: backgroundColor ?? "white",
        },
      ]}
    >
      <Text >Lokasi : Jl. DAWDWADW</Text>
      <Text>{new Date().toLocaleDateString()}</Text>
    </View>
  );
};

export default TPSCard;

const styles = StyleSheet.create({
  app: {
    width: "50%",
    height: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    justifyContent: "space-between",
    flexGrow: 1,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
});
