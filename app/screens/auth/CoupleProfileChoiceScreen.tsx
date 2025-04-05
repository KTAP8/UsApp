import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import { supabase } from "../../lib/supabase/client";

type Props = NativeStackScreenProps<AuthStackParamList, "CoupleProfileChoice">;

export default function CoupleProfileChoiceScreen({ navigation }: Props) {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Us!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>
          Let's set up your couple profile. Are you starting fresh or joining
          your partner?
        </Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, styles.createOption]}
          onPress={() =>
            navigation.navigate("CreateCoupleProfile", { mode: "create" })
          }
        >
          <Text style={styles.optionEmoji}>💑</Text>
          <Text style={styles.optionTitle}>Create New Profile</Text>
          <Text style={styles.optionDescription}>
            Start a new couple profile and invite your partner to join
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.joinOption]}
          onPress={() =>
            navigation.navigate("CreateCoupleProfile", { mode: "join" })
          }
        >
          <Text style={styles.optionEmoji}>🤝</Text>
          <Text style={styles.optionTitle}>Join Existing Profile</Text>
          <Text style={styles.optionDescription}>
            Join your partner's profile using their invitation code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  options: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  option: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createOption: {
    borderColor: "#FF6B6B",
    borderWidth: 2,
  },
  joinOption: {
    borderColor: "#4ECDC4",
    borderWidth: 2,
  },
  optionEmoji: {
    fontSize: 36,
    marginBottom: 12,
    textAlign: "center",
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    top: 10,
    padding: 8,
  },
  logoutText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
});
