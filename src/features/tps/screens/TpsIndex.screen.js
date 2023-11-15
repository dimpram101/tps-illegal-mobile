import React, { useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  ScrollView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Carousel from "react-native-reanimated-carousel";
import { Button, Paragraph } from "react-native-paper";

const gap = 1;
const WIDTH = Dimensions.get("window").width;

const TpsIndex = () => {
  const [location, setLocation] = React.useState(null);
  const carouselRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#2FC8B0" size="large" />
      </View>
    );
  }

  console.log(location);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        showsUserLocation={true}
      />

      <View
        style={{
          position: "absolute",
          bottom: WIDTH / 1.8 - 4,
          zIndex: 10,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          mode="contained"
          style={{ backgroundColor: "#2FC8B0", width: "100%" }}
        >
          Tambah Titik TPS Ilegal
        </Button>
      </View>

      <View
        style={{
          width: "100%",
          margin: "auto",
          position: "absolute",
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Carousel
          ref={carouselRef}
          width={WIDTH}
          height={WIDTH / 1.8}
          pagingEnabled
          snapEnabled
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderRadius: 24,
                padding: 8,
                backgroundColor: "rgba(255,255,255,0.8)",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flex: 1,
                  padding: 8,
                }}
              >
                <Text
                  style={{ textAlign: "left", fontSize: 17, fontWeight: 500 }}
                >
                  Jalan Pahlawan No. 1 Bukit Biru, Timbau, Kec. Tenggarong,
                  Kabupaten Kutai Kartanegara {index}
                </Text>
                <Paragraph style={{ fontWeight: 400 }}>
                  Terdapat 1 TPS Ilegal di lokasi ini. TPS ini sudah bertumpuk
                  sampah dan mengganggu lingkungan sekitar.
                </Paragraph>
              </View>
              <Button
                mode="contained"
                style={{
                  backgroundColor: "#2FC8B0",
                  borderRadius: 12,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Lihat Detail
              </Button>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default TpsIndex;

{
  /* <Pressable
  style={{
    position: "absolute",
    bottom: 30,
    borderRadius: 25,
    opacity: 0.8,
    right: 15,
    paddingLeft: 2,
    width: 50,
    justifyContent: "center",
    height: 50,
    zIndex: 10,
    backgroundColor: "#2FC8B0",
  }}
>
  <Ionicons name="add" size={50} color="white" />
</Pressable> */
}

{
  /* <Text
        style={{
          textAlign: "left",
          marginTop: 10,
          marginBottom: 4,
          fontWeight: "bold",
        }}
      >
        Pemetaan TPS Ilegal
      </Text> */
}
{
  /* <ScrollView
        contentContainerStyle={{
          width: "100%",
          padding: 2,
          borderRadius: 12,
          gap: 4,
        }}
        scrollEnabled={true}
      >
        <FlatList
          nestedScrollEnabled={true}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          horizontal={false}
          contentContainerStyle={{ gap }}
          columnWrapperStyle={{ gap }}
          renderItem={({ item, index }) => <TPSCard key={index} />}
          numColumns={2}
        />
        {[1,2,3,4,5,6,7,8,9,10].map((item, index) => (
          <TPSCard key={index}/>
        ))}
      </ScrollView> */
}
