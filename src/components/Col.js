import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Col = ({ nuwRows, children }) => {
  return <View style={styles[`${nuwRows}col`]}>{children}</View>;
};

export default Col;

const styles = StyleSheet.create({
  "1col": {
    borderColor: "#fff",
    borderWidth: 1,
    flex: 1,
  },
  "2col": {
    borderColor: "#fff",
    borderWidth: 1,
    flex: 2,
  },
  "3col": {
    borderColor: "#fff",
    borderWidth: 1,
    flex: 3,
  },
  "4col": {
    flex: 4,
  },
});
