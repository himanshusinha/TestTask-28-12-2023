import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import {
  LoginScreen,
  OnBoardingScreen,
  SignUpScreen,
  SplashScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen
        name={routes.ON_BOARDING_SCREEN}
        component={OnBoardingScreen}
      />
      <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={routes.SIGN_UP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
