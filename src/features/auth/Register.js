import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Button, RadioButton, TextInput } from "react-native-paper";

const textInputTheme = {
  theme: {
    colors: {
      primary: "black",
    },
  },
  mode: "outlined",
};

const image = {
  uri: "../../../assets/Register.png",
};

const Register = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} overScrollMode="auto">
      <Text style={styles.titleText}>Register</Text>
      <View style={styles.form}>
        <TextInput
          label={"Nama"}
          style={styles.textInput}
          {...textInputTheme}
        />
        <TextInput
          label={"Email"}
          style={styles.textInput}
          {...textInputTheme}
        />
        <TextInput
          label={"No Telp"}
          style={styles.textInput}
          {...textInputTheme}
        />
        <TextInput
          label={"Alamat"}
          style={styles.textInput}
          {...textInputTheme}
        />
        <Text>Gender</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton value="Laki-Laki"  />
            <Text>Laki-Laki</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton value="Laki-Laki" />
            <Text>Perempuan</Text>
          </View>
        </View>
        <TextInput
          label={"Password"}
          style={styles.textInput}
          secureTextEntry
          {...textInputTheme}
          />

        <TextInput
          label={"Confirm Password"}
          style={styles.textInput}
          secureTextEntry
          {...textInputTheme}
        />
      </View>
      <Button
        mode="text"
        onPress={() => {
          
        }}
        labelStyle={{
          color: "white",
        }}
        buttonColor="#004E64"
      >
        Daftar
      </Button>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  form: {
    marginVertical: 12,
    gap: 8,
  },
  textInput: {
    height: 45,
  },
});
