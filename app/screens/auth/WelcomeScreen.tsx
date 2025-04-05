import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

const { width: screenWidth } = Dimensions.get("window");

const features = [
  {
    title: "Joint Diary",
    description:
      "Create and share memories together. Add photos, videos, and voice notes to capture your special moments.",
    emoji: "📝",
  },
  {
    title: "Mood Sync",
    description:
      "Track your moods together and stay emotionally connected with your partner.",
    emoji: "❤️",
  },
  {
    title: "Memory Map",
    description:
      "Visualize your journey together on a map. See where you've been and plan where you'll go.",
    emoji: "🗺️",
  },
  {
    title: "Dream Board",
    description:
      "Set goals and dreams together. Track your progress and celebrate achievements.",
    emoji: "✨",
  },
];

export default function WelcomeScreen({ navigation }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / screenWidth);
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {features.map((feature, index) => (
          <View key={index} style={styles.page}>
            <Text style={styles.emoji}>{feature.emoji}</Text>
            <Text style={styles.title}>{feature.title}</Text>
            <Text style={styles.description}>{feature.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {features.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentPage && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.secondaryButtonText}>
            I already have an account
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
  },
  page: {
    width: screenWidth,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#FF6B6B",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    padding: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
