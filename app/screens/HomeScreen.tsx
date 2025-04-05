import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/types";
import { supabase } from "../lib/supabase/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<MainStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const handleLogout = async () => {
    try {
      // Show loading alert
      Alert.alert("Logging out...", "Please wait...");

      // Clear Supabase session
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear AsyncStorage
      await AsyncStorage.clear();

      // The RootNavigation will automatically redirect to AuthStack
      // when the session is cleared
    } catch (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    }
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: handleLogout,
        style: "destructive",
      },
    ]);
  };

  const handleMoodSync = () => {
    navigation.navigate("MoodSync");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {/* Today's Mood Widget */}
        <TouchableOpacity style={styles.widget} onPress={handleMoodSync}>
          <View style={styles.widgetHeader}>
            <Text style={styles.widgetTitle}>Today's Mood</Text>
            <Text style={styles.widgetAction}>Log Mood</Text>
          </View>
          <View style={styles.moodPreview}>
            <Text style={styles.moodEmoji}>😊</Text>
            <Text style={styles.moodText}>How are you feeling today?</Text>
          </View>
        </TouchableOpacity>

        {/* Latest Memory Widget */}
        <TouchableOpacity
          style={styles.widget}
          onPress={() => navigation.navigate("Diary")}
        >
          <Text style={styles.widgetTitle}>Latest Memory</Text>
          <Text style={styles.widgetSubtext}>No memories yet</Text>
          <Text style={styles.widgetSubtext}>Tap to create one</Text>
        </TouchableOpacity>

        {/* Love Currency Widget */}
        <TouchableOpacity style={styles.widget}>
          <Text style={styles.widgetTitle}>Love Currency</Text>
          <Text style={styles.widgetValue}>0</Text>
          <Text style={styles.widgetSubtext}>Points earned</Text>
        </TouchableOpacity>

        {/* Upcoming Events Widget */}
        <TouchableOpacity style={styles.widget}>
          <Text style={styles.widgetTitle}>Upcoming</Text>
          <Text style={styles.widgetSubtext}>No events yet</Text>
          <Text style={styles.widgetSubtext}>Tap to add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Diary")}
          >
            <Text style={styles.actionButtonText}>Add Memory</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("MoodSync")}
          >
            <Text style={styles.actionButtonText}>Log Mood</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    gap: 10,
  },
  widget: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  widgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  widgetAction: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "500",
  },
  moodPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodText: {
    fontSize: 16,
    color: "#666",
  },
  widgetValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  widgetSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    padding: 15,
    flex: 1,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
