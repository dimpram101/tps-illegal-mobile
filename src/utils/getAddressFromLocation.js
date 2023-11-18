import axios from "axios";

export const getAddressFromLocation = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
    );

    const addressArr = res.data.display_name.split(",")

    const address = addressArr[0] + "," + addressArr[1];

    return address;
  } catch (error) {
    return error;
  }
};
