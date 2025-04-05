import React from "react";
import { StatusBar } from "expo-status-bar";
import { RootNavigation } from "./app/navigation/RootNavigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RootNavigation />
    </>
  );
}
