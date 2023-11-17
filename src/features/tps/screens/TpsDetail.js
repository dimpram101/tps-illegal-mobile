import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React from "react";
import api, { BASE_URL } from "../../../api/api";
import moment from "moment";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../../contexts/AuthContext";

const TpsDetail = ({ route, navigation }) => {
  const [tpsData, setTpsData] = React.useState(null);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { authState } = useAuth();

  const postImageHandler = async () => {
    const formData = new FormData();

    selectedImages.forEach((image, index) => {
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
          },
        })
        .then((res) => {
          setTpsData(res.data.data);
        })
        .catch((err) => console.log(err.response.data));
    };
    getTpsDetailData();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets.map((asset) => asset));
    }
  };

  if (!tpsData) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{tpsData.address}</Text>
      <View style={{ width: "100%" }}>
        {tpsData.tpsimages?.length > 0 && (
          <FlatList
            ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
            data={tpsData.tpsimages}
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `${BASE_URL}${`${item.path}`.split("public\\")[1]}`,
                }}
                key={item.id}
                width={200}
                height={200}
              />
            )}
          />
        )}
      </View>
      <View style={styles.notesSection}>
        <Text style={styles.noteHeader}>Catatan:</Text>
        <Text style={styles.notes}>{tpsData.notes}</Text>
      </View>
      <View style={styles.createdBy}>
        <Text style={styles.createdByText}>
          Dilaporkan pada tanggal{" "}
          {moment(tpsData.createdAt).format("DD-MM-YYYY")} oleh{" "}
          {tpsData.user?.name}
        </Text>
      </View>

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
          disabled={selectedImages.length < 1 || isLoading}
        >
          Kirim {`(${selectedImages.length})`}
        </Button>
      </View>
    </ScrollView>
  );
};

export default TpsDetail;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
  },
  notesSection: {
    marginVertical: 16,
  },
  noteHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notes: {
    fontSize: 16,
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
});
