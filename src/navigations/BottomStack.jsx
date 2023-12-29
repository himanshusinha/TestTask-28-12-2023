import React from 'react';
import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import routes from '../constants/routes';
import {
  BookingsScreen,
  ExploreScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';
import images from '../constants/images';
import {moderateScale, textScale} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  const renderTabIcon = (source, isFocused, title) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: isFocused ? colors.GREEN : null,
          width: moderateScale(100),
          height: moderateScale(34),
          borderRadius: moderateScale(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isFocused ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={source}
              style={{width: moderateScale(20), height: moderateScale(20)}}
              color={colors.GRAY}
            />
            <Text
              style={{
                color: colors.WHITE,
                fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                marginStart: moderateScale(5),
              }}>
              {title}
            </Text>
          </View>
        ) : (
          <Image
            source={source}
            style={{width: moderateScale(20), height: moderateScale(20)}}
            tintColor={colors.GRAY}
          />
        )}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: colors.NAVY_BLUE,
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name={routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            renderTabIcon(images.home, focused, routes.HOME_SCREEN),
          tabBarLabel: routes.HOME_SCREEN,
        }}
      />

      <Tab.Screen
        name={routes.EXPLORE_SCREEN}
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) =>
            renderTabIcon(images.explore, focused, routes.EXPLORE_SCREEN),
          tabBarLabel: routes.EXPLORE_SCREEN,
        }}
      />

      <Tab.Screen
        name={routes.BOOKINGS_SCREEN}
        component={BookingsScreen}
        options={{
          tabBarIcon: ({focused}) =>
            renderTabIcon(images.bookings, focused, routes.BOOKINGS_SCREEN),
          tabBarLabel: routes.BOOKINGS_SCREEN,
        }}
      />

      <Tab.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) =>
            renderTabIcon(images.people, focused, routes.PROFILE_SCREEN),
          tabBarLabel: routes.PROFILE_SCREEN,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;
