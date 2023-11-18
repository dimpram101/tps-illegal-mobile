import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const location2 = await Location.getCurrentPositionAsync({});
      if (location) {
        setLocation(location);
      } else if (location2) {
        setLocation(location2);
      }
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  value = { location, setLocation };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
