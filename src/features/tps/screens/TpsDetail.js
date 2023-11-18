import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React from "react";
import api, { BASE_URL } from "../../../api/api";
import moment from "moment";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../../contexts/AuthContext";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { IconButton } from "react-native-paper";

const TpsDetail = ({ route, navigation }) => {
  const [tpsData, setTpsData] = React.useState(null);
  const [selectedInputImages, setSelectedInputImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { authState } = useAuth();
  const [selectedImage, setSelectedImage] = React.useState({
    uri: "",
    photoBy: "",
    date: "",
  });
  const [modalVisible, setModalVisible] = React.useState(false);

  const postImageHandler = async () => {
    const formData = new FormData();

    selectedInputImages.forEach((image, index) => {
      formData.append("images", {
        name: `image${index}`,
        type: "image/jpeg",
        uri: image.uri,
      });
    });

    formData.append("user_id", authState.userId);

    setIsLoading(true);
    api
      .post(`/tps/${route.params.tpsId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        ToastAndroid.show("Berhasil menambahkan foto!", ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    const getTpsDetailData = async () => {
      api
        .get(`/tps/${route.params.tpsId}`, {
          params: {
            withImage: true,
            withUser: true,
            withUserFromImage: true,
          },
        })
        .then((res) => {
          setTpsData(res.data.data);
        })
        .catch((err) => console.log(err.response.data));
    };
    getTpsDetailData();
  }, []);

  console.log(tpsData);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setSelectedInputImages(result.assets.map((asset) => asset));
    }
  };

  if (!tpsData) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedImage({
            uri: "",
            photoBy: "",
          });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{
                uri: selectedImage.uri,
              }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%", flex: 1 }}
            />
            <Text style={{
              fontSize: 12,
              fontStyle: "italic",
              marginBottom: 8,
            }}>Diupload oleh {selectedImage.photoBy} pada {moment(selectedImage.date).format("DD-MM-YYYY")}</Text>
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                {
                  width: 100,
                },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ height: 250 }}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: tpsData.latitude,
              longitude: tpsData.longitude,
              latitudeDelta: 0.028,
              longitudeDelta: 0.0024,
            }}
            mapType="standard"
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: tpsData.latitude,
                longitude: tpsData.longitude,
              }}
            />
          </MapView>
        </View>
        <View style={{ padding: 8 }}>
          <View style={{ marginBottom: 8, gap: 2 }}>
            <Text style={{ fontSize: 17, fontWeight: 500 }}>Alamat</Text>
            <View
              style={{
                borderWidth: 0.7,
                borderColor: "#2FC8B0",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Text>{tpsData.address}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 8, gap: 2 }}>
            <Text style={{ fontSize: 17, fontWeight: 500 }}>Catatan</Text>
            <View
              style={{
                borderWidth: 0.7,
                borderColor: "#2FC8B0",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Text>{tpsData.notes}</Text>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            {tpsData.tpsimages?.length > 0 && (
              <FlatList
                ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
                data={tpsData.tpsimages}
                horizontal={true}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setSelectedImage({
                        uri: `${BASE_URL}${
                          `${item.path}`.split("public\\")[1]
                        }`,
                        photoBy: item.users.name,
                        date: item.createdAt,
                      });
                      setModalVisible(true);
                    }}
                  >
                    <Image
                      source={{
                        uri: `${BASE_URL}${
                          `${item.path}`.split("public\\")[1]
                        }`,
                      }}
                      key={item.id}
                      width={200}
                      height={200}
                    />
                  </Pressable>
                )}
              />
            )}
          </View>
          <View style={styles.createdBy}>
            <Text style={styles.createdByText}>
              Dilaporkan pada tanggal{" "}
              {moment(tpsData.createdAt).format("DD-MM-YYYY")} oleh{" "}
              {tpsData.user?.name}
            </Text>
          </View>
        </View>
        {/* <Pressable
          style={{
            marginTop: 8,
            width: "100%",
            borderWidth: 0.7,
            borderColor: "#2FC8B0",
            borderRadius: 12,
            elevation: 1,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ paddingLeft: 12 }}>
            {" "}
            Lihat Event Volunteer untuk TPS ini
          </Text>
          <View>
            <IconButton
              icon="chevron-right"
              iconColor="#2FC8B0"
              // size={10}
              style={{
                borderRadius: 0,
                flex: 1,
                margin: 0,
              }}
              onPress={() =>
                navigation.navigate("TpsDetail", { tpsId: tps.id })
              }
            />
          </View>
        </Pressable> */}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode="elevated"
          buttonColor="#2FC8B0"
          textColor="white"
          style={{ borderRadius: 4, flex: 1 }}
          onPress={() => pickImageAsync()}
        >
          Tambah Foto
        </Button>
        <Button
          mode="elevated"
          buttonColor="#2FC8B0"
          textColor="white"
          style={{ borderRadius: 4, flex: 0.3 }}
          onPress={() => postImageHandler()}
          disabled={selectedInputImages.length < 1 || isLoading}
        >
          Kirim {`(${selectedInputImages.length})`}
        </Button>
      </View>
    </View>
  );
};

export default TpsDetail;

const styles = StyleSheet.create({
  container: {
    // padding: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
  },
  createdBySection: {
    marginBottom: 16,
  },
  createdByText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 8,
    alignSelf: "center",
    flexDirection: "row",
    gap: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    height: "70%",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2FC8B0",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
