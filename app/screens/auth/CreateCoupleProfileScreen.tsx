import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import { supabase } from "../../lib/supabase/client";
import { Session } from "@supabase/supabase-js";

type Props = NativeStackScreenProps<AuthStackParamList, "CreateCoupleProfile">;

export default function CreateCoupleProfileScreen({
  navigation,
  route,
}: Props) {
  const { mode } = route.params;
  const [coupleName, setCoupleName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        Alert.alert("Error", "Please sign in again.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCreateProfile = async () => {
    if (!session?.user) {
      Alert.alert("Error", "Please sign in again.");
      return;
    }

    if (!coupleName.trim()) {
      Alert.alert("Error", "Please enter a name for your couple profile");
      return;
    }

    try {
      setLoading(true);

      // Generate a unique join code (6 characters)
      const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      // Create couple profile
      const { data: couple, error: coupleError } = await supabase
        .from("couples")
        .insert({
          name: coupleName.trim(),
          join_code: joinCode,
          status: "active",
        })
        .select()
        .single();

      if (coupleError) throw coupleError;

      // Add creator as a couple member
      const { error: memberError } = await supabase
        .from("couple_members")
        .insert({
          couple_id: couple.id,
          user_id: session.user.id,
          role: "creator",
        });

      if (memberError) throw memberError;

      Alert.alert(
        "Success!",
        `Your couple profile has been created! Share this code with your partner: ${joinCode}`,
        [
          {
            text: "OK",
            onPress: async () => {
              // Force a recheck of the couple profile status
              const { data, error } = await supabase
                .from("couple_members")
                .select("id")
                .eq("user_id", session.user.id);

              if (data && data.length > 0 && !error) {
                // Navigate to root to trigger MainStack
                // @ts-ignore - We know this exists at the root level
                navigation.getParent()?.reset({
                  index: 0,
                  routes: [{ name: "Main" }],
                });
              }
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create couple profile");
      console.error("Create profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinProfile = async () => {
    if (!session?.user) {
      Alert.alert("Error", "Please sign in again.");
      return;
    }

    if (!joinCode.trim()) {
      Alert.alert("Error", "Please enter the invitation code");
      return;
    }

    try {
      setLoading(true);

      // Find couple by join code
      const { data: couple, error: coupleError } = await supabase
        .from("couples")
        .select()
        .eq("join_code", joinCode.trim())
        .eq("status", "active")
        .single();

      if (coupleError || !couple) {
        Alert.alert(
          "Error",
          "Invalid invitation code. Please check and try again."
        );
        return;
      }

      // Check if user is already a member
      const { data: existingMember } = await supabase
        .from("couple_members")
        .select()
        .eq("couple_id", couple.id)
        .eq("user_id", session.user.id)
        .single();

      if (existingMember) {
        Alert.alert(
          "Error",
          "You are already a member of this couple profile."
        );
        return;
      }

      // Add user as a couple member
      const { error: memberError } = await supabase
        .from("couple_members")
        .insert({
          couple_id: couple.id,
          user_id: session.user.id,
          role: "member",
        });

      if (memberError) throw memberError;

      Alert.alert(
        "Success!",
        "You've successfully joined the couple profile!",
        [
          {
            text: "OK",
            onPress: async () => {
              // Force a recheck of the couple profile status
              const { data, error } = await supabase
                .from("couple_members")
                .select("id")
                .eq("user_id", session.user.id);

              if (data && data.length > 0 && !error) {
                // Navigate to root to trigger MainStack
                // @ts-ignore - We know this exists at the root level
                navigation.getParent()?.reset({
                  index: 0,
                  routes: [{ name: "Main" }],
                });
              }
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to join couple profile");
      console.error("Join profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === "create" ? "Create Couple Profile" : "Join Your Partner"}
        </Text>
        <Text style={styles.subtitle}>
          {mode === "create"
            ? "Create a profile for you and your partner"
            : "Enter the invitation code from your partner"}
        </Text>
      </View>

      <View style={styles.form}>
        {mode === "create" ? (
          <TextInput
            style={styles.input}
            placeholder="Enter your couple name"
            value={coupleName}
            onChangeText={setCoupleName}
            autoCapitalize="words"
            autoCorrect={false}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Enter invitation code"
            value={joinCode}
            onChangeText={setJoinCode}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={mode === "create" ? handleCreateProfile : handleJoinProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {mode === "create" ? "Create Profile" : "Join Profile"}
            </Text>
          )}
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
  form: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
