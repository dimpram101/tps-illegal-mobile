import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import {
  getUserData,
  updateUserData,
  updateUserPassword,
} from "../../../api/fetch";

const EditAccount = ({ navigation }) => {
  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    address: "",
    gender: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserData()
      .then((data) => setUser(data))
      .catch((err) => console.log(err.response.data));
  }, []);

  const updateUserHandler = () => {
    updateUserData(user.id, user)
      .then((_data) => {
        ToastAndroid.show("Data berhasil diperbarui", ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  };

  const updatePasswordHandler = () => {
    if (password.length < 8) {
      ToastAndroid.show("Password minimal 8 karakter", ToastAndroid.SHORT);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Password tidak sama", ToastAndroid.SHORT);
      return;
    }

    setIsLoading(true);
    updateUserPassword(user.id, { password, confirmPassword })
      .then(() => {
        ToastAndroid.show("Password berhasil diperbarui", ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2FC8B0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textInputLabel}>Nama</Text>
            <TextInput
              style={styles.textInputBox}
              value={user.name}
              onChangeText={(e) => setUser({ ...user, name: e })}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textInputLabel}>Email</Text>
            <TextInput
              style={styles.textInputBox}
              value={user.email}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textInputLabel}>No. Telepon</Text>
            <TextInput
              style={styles.textInputBox}
              value={user.phone_number}
              onChangeText={(e) => setUser({ ...user, phone_number: e })}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textInputLabel}>Alamat</Text>
            <TextInput
              style={styles.textInputBox}
              value={user.address}
              multiline
              onChangeText={(e) => setUser({ ...user, address: e })}
            />
          </View>
        </View>
        <Button
          mode="contained-tonal"
          style={styles.button}
          textColor="white"
          buttonColor="#2FC8B0"
          onPress={updateUserHandler}
          disabled={isLoading}
        >
          Simpan Data
        </Button>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textInputLabel}>Password</Text>
            <TextInput
              style={styles.textInputBox}
              value={password}
              onChangeText={(e) => setPassword(e)}
              secureTextEntry
              placeholder="Password"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textInputLabel}>Konfirmasi Password</Text>
            <TextInput
              style={styles.textInputBox}
              value={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
              secureTextEntry
              placeholder="Konfirmasi Password"
            />
          </View>
        </View>
        <Button
          mode="contained-tonal"
          style={styles.button}
          textColor="white"
          buttonColor="#2FC8B0"
          onPress={updatePasswordHandler}
          disabled={isLoading}
        >
          Simpan Password
        </Button>
      </View>
    </View>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 12,
  },
  contentContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.6,
    elevation: 6,
    borderColor: "#2FC8B0",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    gap: 2,
  },
  textInputLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  textInputBox: {
    backgroundColor: "#F2F2F2",
    padding: 8,
    borderRadius: 4,
    flexGrow: 1,
  },
  button: {
    width: "100%",
    borderRadius: 4,
    padding: 0,
  },
});
