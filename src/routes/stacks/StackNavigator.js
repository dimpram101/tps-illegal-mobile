import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from '../tabs/TabsNavigator';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import AddTps from '../../features/tps/screens/AddTps';
import TpsDetail from '../../features/tps/screens/TpsDetail';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator screenOptions={{
      contentStyle: {
        backgroundColor: !authState.authenticated ? '#2FC8B0' : '#FFFFFF'
      }
    }}>
      {!authState.authenticated ? (
        <React.Fragment>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false, }} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false, }} />
          <Stack.Screen name="AddTps" component={AddTps} options={{ headerShown: true, headerTitle: "Tambahkan Data TPS Ilegal" }} />
          <Stack.Screen name="TpsDetail" component={TpsDetail} options={{ headerShown: true, headerTitle: "Detail TPS" }} />
        </React.Fragment>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator