import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from '../tabs/TabsNavigator';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator>
      {!authState.authenticated ? (
        <React.Fragment>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false, }} />
        </React.Fragment>
      ) : (
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false, }} />
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator