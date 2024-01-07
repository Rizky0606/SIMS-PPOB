import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import TopUp from '../screens/TopUp';
import Transaction from '../screens/Transaction';
import Account from '../screens/Account';

const TabNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="gray"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Topup"
        component={TopUp}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="money" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="credit-card" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Akun"
        component={Account}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
