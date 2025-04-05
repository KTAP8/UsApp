import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";

// Import screens
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import CoupleProfileChoiceScreen from "../screens/auth/CoupleProfileChoiceScreen";
import CreateCoupleProfileScreen from "../screens/auth/CreateCoupleProfileScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthStackProps {
  initialRouteName?: keyof AuthStackParamList;
}

export function AuthStack({ initialRouteName = "Welcome" }: AuthStackProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="CoupleProfileChoice"
        component={CoupleProfileChoiceScreen}
      />
      <Stack.Screen
        name="CreateCoupleProfile"
        component={CreateCoupleProfileScreen}
      />
    </Stack.Navigator>
  );
}
