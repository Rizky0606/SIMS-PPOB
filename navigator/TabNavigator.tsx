import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import TopUp from '../screens/TopUp';
import Transaction from '../screens/Transaction';
import Account from '../screens/Account';

const TabNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="Topup" component={TopUp} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Akun" component={Account} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
