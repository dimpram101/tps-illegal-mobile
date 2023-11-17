import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { getUserData } from "../../../api/fetch";

const ProfileIndex = ({ navigation }) => {
  const { onLogout } = useAuth();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    getUserData()
      .then((data) => setUser(data))
      .catch((err) => console.log(err.response.data));
  }, []);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="ios-person" size={60} color="grey" />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "start" }}
        >
          <Text style={{ fontWeight: 600, fontSize: 18 }}>{user.name}</Text>
          <Text style={{ fontSize: 12 }}>{user.phone_number}</Text>
          <Text style={{ fontSize: 12 }}>{user.address}</Text>
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
          Opsi
        </Text>
        <Pressable
          style={styles.opsiItem}
          onPress={() => navigation.navigate("TPS")}
        >
          <Text style={{ fontSize: 16 }}>Edit Akun</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="grey" />
        </Pressable>
        <Pressable
          style={styles.opsiItem}
          onPress={() => navigation.navigate("TPS")}
        >
          <Text style={{ fontSize: 16 }}>Riwayat Volunteer</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="grey" />
        </Pressable>
        <Pressable style={styles.opsiItem}>
          <Text style={{ fontSize: 16 }}>Riwayat Masukan TPS Ilegal</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="grey" />
        </Pressable>
        <Pressable style={styles.opsiItem} onPress={() => onLogout()}>
          <Text style={{ fontSize: 16 }}>Logout</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="grey" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  profileCard: {
    height: 140,
    width: "100%",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 12,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 5,
    alignContent: "center",
    justifyContent: "center",
    padding: 4,
    paddingHorizontal: 12,
    gap: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 1000,
  },
  opsiItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    height: 50,
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "grey",
    borderWidth: 0.5,
  },
});

export default ProfileIndex;
