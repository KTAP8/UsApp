import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  CoupleProfileChoice: undefined;
  CreateCoupleProfile: {
    mode: "create" | "join";
  };
};

export type MainStackParamList = {
  Home: undefined;
  Diary: undefined;
  MoodSync: undefined;
  MemoryMap: undefined;
  DreamBoard: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};
