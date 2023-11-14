import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/routes/stacks/StackNavigator";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
          <StatusBar style="auto" />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// "softwareKeyboardLayoutMode": "pan"
