import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<MainStackParamList, "MemoryMap">;

export default function MemoryMapScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Memory Map</Text>
        <Text style={styles.subtitle}>Your journey together, mapped</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>Map Coming Soon</Text>
        <Text style={styles.placeholderSubtext}>
          We'll show your shared memories here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#eee",
    borderStyle: "dashed",
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: "#666",
  },
});
