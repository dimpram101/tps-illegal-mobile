import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TpsIndex from "../../features/tps/screens/TpsIndex.screen";
import ProfileIndex from "../../features/profile/screens/ProfileIndex";
import EventIndex from "../../features/event/screens/EventIndex";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <React.Fragment>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingBottom: 5,
            // backgroundColor: "#004E64",
          },
          tabBarActiveTintColor: "#2FC8B0",
          // tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
          elevation: 0,
        }}
      >
        <Tab.Screen
          name="TPS"
          component={TpsIndex}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trash-bin" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Volunteer"
          component={EventIndex}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileIndex}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person" color={color} size={size} />
            ),
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default TabsNavigator;
