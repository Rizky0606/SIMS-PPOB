import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckingUser from '../screens/CheckingUser';
import TabNavigator from './TabNavigator';
import Login from '../screens/Login';
import Register from '../screens/Register';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Checking"
        component={CheckingUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
