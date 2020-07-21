import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Animated, Easing} from 'react-native';

import {
  SplashScreen,
  ResultSearchScreen,
  GeneralAuthScreen,
  ChatScreen,
  PetDetailScreen,
  VerifyPhoneNumberScreen,
  CreateUserInfoScreen,
  IntroAppScreen,
  RequestAdoptDetailScreen,
  PetListScreen,
  WishListScreen,
  PetRequestListScreen,
  ErrorRequestScreen,
  SettingScreen,
  ThemeModeScreen
} from '../screens';

import AddPetScreen from '../tabs/screens/add-pet';
import {navigationRef} from './NavigationService';
import MainTabNavigator from '../tabs';

const Stack = createStackNavigator();

const Root = createStackNavigator();

const SwitchNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Main'}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ResultSearchScreen" component={ResultSearchScreen} />
      <Stack.Screen
        name="VerifyPhoneNumberScreen"
        component={VerifyPhoneNumberScreen}
      />
      <Stack.Screen name="GeneralAuthScreen" component={GeneralAuthScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="PetDetailScreen" component={PetDetailScreen} />
      <Stack.Screen
        name="CreateUserInfoScreen"
        component={CreateUserInfoScreen}
      />
      <Stack.Screen name="IntroAppScreen" component={IntroAppScreen} />
      <Stack.Screen
        name="RequestAdoptDetailScreen"
        component={RequestAdoptDetailScreen}
      />
      <Stack.Screen name="PetListScreen" component={PetListScreen} />
      <Stack.Screen name="WishListScreen" component={WishListScreen} />
      <Stack.Screen
        name="PetRequestListScreen"
        component={PetRequestListScreen}
      />
      <Stack.Screen name="ErrorRequestScreen" component={ErrorRequestScreen} />
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator
        screenOptions={({route, navigation}) => ({
          gestureEnabled: true,
          cardOverlayEnabled: true,
          headerStatusBarHeight:
            navigation.dangerouslyGetState().routes.indexOf(route) > 0
              ? 0
              : undefined,
          ...TransitionPresets.ModalPresentationIOS,
        })}
        mode={'modal'}
        headerMode={'none'}
        initialRouteName="Main">
        <Root.Screen
          name="Main"
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
          component={SwitchNavigation}
        />
        <Root.Screen name="AddPetScreen" component={AddPetScreen} />
        <Root.Screen
          name="RequestAdoptDetailScreen"
          component={RequestAdoptDetailScreen}
        />
        <Root.Screen name="SettingScreen" component={SettingScreen} />
        <Root.Screen name="ThemeModeScreen" component={ThemeModeScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
