import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import { supabase } from "../../lib/supabase/client";

type Props = NativeStackScreenProps<AuthStackParamList, "CreateCoupleProfile">;

export default function CreateCoupleProfile({ navigation }: Props) {
  const [coupleName, setCoupleName] = useState("");
  const [loading, setLoading] = useState(false);

  const generateJoinCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateCouple = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const joinCode = generateJoinCode();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No authenticated user found");

      // Create couple profile
      const { error: coupleError } = await supabase.from("couples").insert([
        {
          name: coupleName,
          join_code: joinCode,
          status: "active",
        },
      ]);

      if (coupleError) throw coupleError;

      // Get the newly created couple's ID
      const { data: couple, error: coupleFetchError } = await supabase
        .from("couples")
        .select("id")
        .eq("join_code", joinCode)
        .single();

      if (coupleFetchError) throw coupleFetchError;

      // Add user as creator of the couple
      const { error: memberError } = await supabase
        .from("couple_members")
        .insert([
          {
            couple_id: couple.id,
            user_id: user.id,
            role: "creator",
          },
        ]);

      if (memberError) throw memberError;

      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" as any }],
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to create couple profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Your Couple Profile</Text>
        <Text style={styles.subtitle}>Start your journey together</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Couple Name"
          value={coupleName}
          onChangeText={setCoupleName}
          autoCapitalize="words"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreateCouple}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating Profile..." : "Create Profile"}
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
