import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthStack } from "./AuthStack";
import { MainStack } from "./MainStack";
import { supabase } from "../lib/supabase/client";
import { Session } from "@supabase/supabase-js";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigation() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [hasCouple, setHasCouple] = React.useState<boolean | null>(null);

  // Check if user has a couple profile
  const checkCoupleProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("couple_members")
        .select("id")
        .eq("user_id", userId);

      if (error) {
        console.error("Error checking couple profile:", error);
        setHasCouple(false);
        return;
      }

      // If we have any entries, user has a couple profile
      setHasCouple(data && data.length > 0);
    } catch (error) {
      console.error("Error checking couple profile:", error);
      setHasCouple(false);
    }
  };

  React.useEffect(() => {
    // Listen for auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkCoupleProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkCoupleProfile(session.user.id);
      } else {
        setHasCouple(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // If we have a session but haven't checked for couple profile yet
  if (session && hasCouple === null) {
    return null; // or a loading screen
  }

  return (
    <NavigationContainer>
      {session ? (
        hasCouple ? (
          <MainStack />
        ) : (
          <AuthStack initialRouteName="CoupleProfileChoice" />
        )
      ) : (
        <AuthStack initialRouteName="Welcome" />
      )}
    </NavigationContainer>
  );
}
