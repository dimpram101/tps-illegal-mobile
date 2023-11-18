import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import moment from "moment";

const TPSCard = ({ tps, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View>
          <Text style={styles.address} numberOfLines={2}>{tps.address}</Text>
          <Text style={styles.notes} numberOfLines={2}>
            {tps.notes}
          </Text>
        </View>
        <Text style={styles.reported}>
          Dilaporkan pada {moment(tps.createdAt).format("DD-MM-YYYY")}
        </Text>
      </View>
      <View style={styles.rightContent}>
        <IconButton
          icon="chevron-right"
          size={24}
          iconColor="white"
          style={{
            borderRadius: 0,
            flex: 1,
            height: "100%",
            width: "100%",
          }}
          onPress={() =>
            navigation.navigate("TpsDetail", { tpsId: tps.id })
          }
        />
      </View>
    </View>
  );
};

export default TPSCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    borderColor: "#2FC8B0",
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 5,
    height: 100,
    flexDirection: "row",
  },
  leftContent: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  rightContent: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2FC8B0",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  address: {
    fontSize: 16,
    fontWeight: "500",
  },
  reported: {
    fontSize: 11,
    fontStyle: "italic",
    fontWeight: "400",
  },
});
