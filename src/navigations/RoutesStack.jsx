import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import BottomStack from './BottomStack';

const RoutesStack = () => {
  const accessToken = useSelector(state => state.authResponse.token);
  return (
    <NavigationContainer>
      {accessToken ? <BottomStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RoutesStack;
