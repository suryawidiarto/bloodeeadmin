import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginComponent from'../screen/RootStack/LoginComponent';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginComponent} options={{headerShown:false,}} />
      </Stack.Navigator>
  );

}

export default RootStack;
