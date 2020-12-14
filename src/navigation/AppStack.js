import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeComponent from '../screen/AppStack/HomeComponent';
import ScanQR from '../screen/AppStack/ScanQR';
import PermintaanDarah from '../screen/AppStack/PermintaanDarah';
import PermintaanDarah2 from '../screen/AppStack/PermintaanDarah2';
import DataPermintaan from '../screen/AppStack/DataPermintaan';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeComponent} options={{headerShown:false,}} />
        <Stack.Screen name="DataPermintaanScreen" component={DataPermintaan} options={{headerShown:false,}} />
        <Stack.Screen name="PermintaanDarahScreen" component={PermintaanDarah} options={{headerShown:false,}} />
        <Stack.Screen name="PermintaanDarah2Screen" component={PermintaanDarah2} options={{headerShown:false,}} />
        <Stack.Screen name="ScanQRScreen" component={ScanQR} options={{headerShown:false,}} />
      </Stack.Navigator>
  );

}

export default RootStack;
