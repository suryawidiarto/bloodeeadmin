import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext, AuthProvider} from '../auth/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from '../navigation/RootStack';
import AppStack from '../navigation/AppStack';

const Route = () => {
  const {user, setUser} = useContext(AuthContext);
  const {initializing, setInitializing} = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <RootStack/>
      </NavigationContainer>
    );
  }

  return (
      <NavigationContainer>
        <AppStack/>
      </NavigationContainer>
  );

}

export default Route;