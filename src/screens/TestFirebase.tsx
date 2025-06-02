import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function TestFirebase() {
  useEffect(() => {
    console.log("Firebase Auth instance:", auth);
  }, []);

  return (
    <View>
      <Text>Test Firebase Auth - Veja o console</Text>
    </View>
  );
}