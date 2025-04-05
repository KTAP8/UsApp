import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "./types";

// Import screens (we'll create these next)
import HomeScreen from "../screens/HomeScreen";
import DiaryScreen from "../screens/diary/DiaryScreen";
import MoodSyncScreen from "../screens/mood/MoodSyncScreen";
import MemoryMapScreen from "../screens/MemoryMapScreen";
import DreamBoardScreen from "../screens/dreams/DreamBoardScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Us",
        }}
      />
      <Stack.Screen name="Diary" component={DiaryScreen} />
      <Stack.Screen name="MoodSync" component={MoodSyncScreen} />
      <Stack.Screen name="MemoryMap" component={MemoryMapScreen} />
      <Stack.Screen name="DreamBoard" component={DreamBoardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
