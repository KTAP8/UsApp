import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<MainStackParamList, "MoodSync">;

const MOODS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "🥰", label: "Loved" },
  { emoji: "😌", label: "Peaceful" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😤", label: "Frustrated" },
];

export default function MoodSyncScreen({ navigation }: Props) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const handleSaveMood = () => {
    // TODO: Implement mood saving logic
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Share your mood with your partner</Text>
      </View>

      <View style={styles.moodGrid}>
        {MOODS.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodItem,
              selectedMood === index && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(index)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Add a note (optional)</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="How are you feeling today?"
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, !selectedMood && styles.saveButtonDisabled]}
        onPress={handleSaveMood}
        disabled={selectedMood === null}
      >
        <Text style={styles.saveButtonText}>Save Mood</Text>
      </TouchableOpacity>
    </ScrollView>
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
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 12,
  },
  moodItem: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
  },
  selectedMood: {
    borderColor: "#FF6B6B",
    backgroundColor: "#FFF5F5",
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    color: "#666",
  },
  notesContainer: {
    padding: 20,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    height: 120,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
