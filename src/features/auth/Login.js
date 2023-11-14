import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button, TextInput } from "react-native-paper";

const textInputTheme = {
  theme: {
    colors: {
      primary: "black",
    },
  },
  mode: "outlined",
};

const Login = ({ navigation }) => {
  const { onLogin } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>TPS Ilegal - Login</Text>
      <View style={styles.form}>
        <TextInput
          label={"Email"}
          value={email}
          onChangeText={(e) => setEmail(e)}
          {...textInputTheme}
          style={{
            borderColor: "red",
          }}
        />
        <TextInput
          label={"Password"}
          value={password}
          onChangeText={(e) => setPassword(e)}
          right={
            <TextInput.Icon
              icon={"eye"}
              onPress={() => setShowPassword((prev) => !prev)}
            />
          }
          secureTextEntry={!showPassword}
          {...textInputTheme}
        />
        <Button
          mode="text"
          onPress={() => {
            onLogin(email, password);
          }}
          labelStyle={{
            color: "white"
          }}
          buttonColor="#004E64"
        >
          Login
        </Button>
        <Pressable onPress={() => navigation.push("Register")}>
          <Text style={styles.registerLabel}>
            Belum punya akun? Daftar di sini
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  form: {
    marginTop: 12,
    gap: 8,
  },
  formLabel: {
    fontWeight: "bold",
  },
  formInputBox: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  registerLabel: {
    color: "white",
    textDecorationLine: "underline",
  },
});

export default Login;
