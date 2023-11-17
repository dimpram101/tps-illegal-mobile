import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyCLMl6Te2psNsoRfPBxatAA04YOYeMD3Fo";

export async function getAddressFromCoordinates(latitude, longitude) {
  try {
    const result = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${latitude},${longitude}`,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );

    console.log(JSON.stringify(result.data, null, 2));

    if (result.data.status !== "OK") {
      return "APASIH";
    } else {
      return result.data.results[0].formatted_address;
    }
  } catch (error) {
    console.log(error);
  }
}
