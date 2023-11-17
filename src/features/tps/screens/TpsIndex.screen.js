import React, { useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  ScrollView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Carousel from "react-native-reanimated-carousel";
import { Button, Paragraph } from "react-native-paper";
import api from "../../../api/api.js";
import { getDistance } from "geolib";
import { useTPS } from "../../../contexts/TPSContext.js";

const WIDTH = Dimensions.get("window").width;

const TpsIndex = ({ navigation }) => {
  const [location, setLocation] = React.useState(null);
  const carouselRef = useRef(null);
  const mapRef = useRef(null);
  const [tpsData, setTpsData] = React.useState([]);
  const [orderedTps, setOrderedTps] = React.useState([]);
  const [selectedTps, setSelectedTps] = React.useState(null);
  const { hasSentData } = useTPS();
  const [isLoading, setIsLoading] = React.useState(true);

  const orderedTpsData = React.useCallback(
    (tpsData) =>
      tpsData.sort(
        (a, b) =>
          getDistance(
            location
              ? {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }
              : { latitude: 0, longitude: 0 },
            { latitude: a.latitude, longitude: a.longitude }
          ) -
          getDistance(
            location
              ? {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }
              : { latitude: 0, longitude: 0 },
            { latitude: b.latitude, longitude: b.longitude }
          )
      ),
    [tpsData]
  );

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    }
  };

  const fetchTpsData = async () => {
    api
      .get("/tps")
      .then((res) => {
        setTpsData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.response.data));
  };

  React.useEffect(() => {
    getLocation();
  }, []);

  React.useEffect(() => {
    fetchTpsData();
  }, [hasSentData]);

  React.useEffect(() => {
    if (tpsData && tpsData.length > 0) {
      const sorted = orderedTpsData(tpsData);
      setOrderedTps(sorted);
      setSelectedTps(sorted[0]);
    }
  }, [tpsData]);

  React.useEffect(() => {
    if (selectedTps) {
      moveRegion(selectedTps.latitude, selectedTps.longitude);
      carouselRef?.current?.scrollTo({
        index: orderedTps.findIndex((s) => s.id === selectedTps.id),
        animated: true,
      });
    }
  }, [selectedTps]);

  const moveRegion = (latitude, longitude) => {
    mapRef?.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.038,
      longitudeDelta: 0.0024,
    });
  };

  if (!location || isLoading) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#2FC8B0" size="large" />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {orderedTps.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.address}
            onPress={() => setSelectedTps(marker)}
          />
        ))}
      </MapView>

      <View
        style={{
          position: "absolute",
          bottom: orderedTps.length > 0 ? WIDTH / 1.8 - 4 : 10,
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
          onPress={() => navigation.navigate("AddTps")}
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
        {orderedTps.length > 0 && (
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
            data={orderedTps}
            onSnapToItem={(index) => setSelectedTps(orderedTps[index])}
            renderItem={({ item }) => (
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
                    {item.address}
                  </Text>
                  <Paragraph style={{ fontWeight: 400 }}>
                    {item.notes}
                  </Paragraph>
                </View>
                <Button
                  mode="contained"
                  style={{ backgroundColor: "#2FC8B0", width: "100%" }}
                  onPress={() => navigation.navigate("TpsDetail", { tpsId: item.id })}
                >
                  Lihat Detail
                </Button>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default TpsIndex;
