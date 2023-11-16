import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import api from "../../../api/api";

const AddTps = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [pin, setPin] = React.useState({
    latitude: -1.145265,
    longitude: 116.880085,
  });
  const [address, setAddress] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets.map((asset) => asset));
    } else {
      alert("Kamu tidak memilih gambar apapun");
    }
  };

  const onSubmitHandler = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("address", address);
    formData.append("user_id", "5");
    formData.append("notes", notes);
    formData.append("latitude", `${pin.latitude}`);
    formData.append("longitude", `${pin.longitude}`);

    if (selectedImages.length < 1) {
      alert("Harap masukkan setidaknya 1 foto");
      return;
    }

    selectedImages.forEach((image, index) => {
      formData.append("images", {
        name: `image${index}`,
        type: "image/jpeg",
        uri: image.uri,
      });
    });

    api
      .post("/tps", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigation.navigate("Tabs");
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: "100%", height: 270, padding: 0 }}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: -1.145265,
            longitude: 116.880085,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
        >
          <Marker
            draggable
            coordinate={pin}
            onDragEnd={(e) => {
              setPin(e.nativeEvent.coordinate);
            }}
          />
        </MapView>
      </View>

      <View
        style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 4, gap: 8 }}
      >
        <View>
          <Text style={styles.labelInput}>Alamat</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Masukkan alamat"
              value={address}
              onChangeText={(e) => setAddress(e)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.labelInput}>Catatan</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Masukkan catatan"
              value={notes}
              onChangeText={(e) => setNotes(e)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.labelInput}>Foto</Text>
          <Button
            mode="contained"
            buttonColor="#2FC8B0"
            textColor="white"
            style={{ borderRadius: 4 }}
            onPress={pickImageAsync}
          >
            Masukkan Foto
          </Button>
          <View
            style={{
              height: 200,
              borderWidth: 1,
              borderColor: "#004E64",

              marginTop: 8,
              justifyContent:
                selectedImages.length < 1 ? "center" : "flex-start",
              alignItems: selectedImages.length < 1 ? "center" : "flex-start",
            }}
          >
            {selectedImages.length < 1 ? (
              <React.Fragment>
                <Text>Gambar akan muncul di sini</Text>
                <Text style={{ fontSize: 12 }}>
                  Harap masukkan setidaknya 1 foto
                </Text>
              </React.Fragment>
            ) : (
              <FlatList
                ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
                data={selectedImages}
                horizontal={true}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                  <Image source={{ uri: item.uri }} style={{ width: 200 }} />
                )}
              />
            )}
          </View>
        </View>
        <Button
          mode="elevated"
          buttonColor="#2FC8B0"
          textColor="white"
          style={{ borderRadius: 4 }}
          onPress={() => onSubmitHandler()}
          disabled={isLoading}
        >
          Tambah
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelInput: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  textInputContainer: {
    width: "100%",
    height: 40,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingLeft: 12,
    backgroundColor: "white",
  },
});

export default AddTps;
