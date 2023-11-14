import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { Button, RadioButton } from "react-native-paper";

const Register = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [no_telp, setNoTelp] = React.useState("");
  const [jenis_kelamin, setJenisKelamin] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confrim_password, setConfrimPassword] = React.useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>Daftar akun</Text>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputLabel}>Nama</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Masukkan nama..."
              keyboardType="default"
              placeholderTextColor={"#2FC8B0"}
              style={styles.textInput}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Masukkan email..."
              keyboardType="email-address"
              placeholderTextColor={"#2FC8B0"}
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>Nomor Telepon</Text>
          <View
            style={[
              styles.textInputContainer,
              { paddingLeft: 0, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View
              style={{
                width: 40,
                borderRightWidth: 1,
                borderRightColor: "lightgrey",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#2FC8B0",
                  fontWeight: "500",
                }}
              >
                +62
              </Text>
            </View>
            <TextInput
              keyboardType="number-pad"
              placeholderTextColor={"#2FC8B0"}
              style={[styles.textInput, { flex: 1, paddingLeft: 12 }]}
              value={no_telp}
              onChangeText={(text) => setNoTelp(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>Jenis Kelamin</Text>
          <View
            style={[
              styles.textInputContainer,
              {
                paddingLeft: 0,
                justifyContent: "left",
                gap: 8,
                flexDirection: "row",
              },
            ]}
          >
            <Pressable
              onPress={() => setJenisKelamin("Laki-Laki")}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="Laki-Laki"
                status={jenis_kelamin === "Laki-Laki" ? "checked" : "unchecked"}
                color="#2FC8B0"
              />
              <Text style={styles.textInput}>Laki-Laki</Text>
            </Pressable>
            <Pressable
              onPress={() => setJenisKelamin("Perempuan")}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="Perempuan"
                status={jenis_kelamin === "Perempuan" ? "checked" : "unchecked"}
                color="#2FC8B0"
              />
              <Text style={styles.textInput}>Perempuan</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>Alamat</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Masukkan alamat..."
              keyboardType="email-address"
              placeholderTextColor={"#2FC8B0"}
              style={styles.textInput}
              value={alamat}
              onChangeText={(text) => setAlamat(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="********"
              keyboardType="default"
              secureTextEntry
              placeholderTextColor={"#2FC8B0"}
              style={styles.textInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>Konfirmasi Password</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="********"
              keyboardType="default"
              secureTextEntry
              placeholderTextColor={"#2FC8B0"}
              style={styles.textInput}
              value={confrim_password}
              onChangeText={(text) => setConfrimPassword(text)}
            />
          </View>
        </View>
      </View>
      <View>
        <Button
          mode="text"
          onPress={() => {
            console.log({
              name,
              email,
              no_telp,
              jenis_kelamin,
              alamat,
              password,
              confrim_password,
            });
          }}
          labelStyle={{
            color: "white",
          }}
          buttonColor="#004E64"
        >
          Daftar
        </Button>
        <Pressable style={{marginTop: 8}} onPress={() => navigation.goBack()}>
          <Text style={{
            color: "white",
            textDecorationColor: "white",
            textDecorationLine: "underline",
            textAlign: "center",
          }}>Sudah punya akun? Login di sini</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  form: {
    marginVertical: 12,
  },
  textInputContainer: {
    width: "100%",
    height: 48,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingLeft: 12,
    backgroundColor: "white",
  },
  inputLabel: {
    marginVertical: 8,
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  textInput: {
    color: "#2FC8B0",
    fontWeight: "500",
  },
});

{
  /* <TextInput
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
        /> */
}
