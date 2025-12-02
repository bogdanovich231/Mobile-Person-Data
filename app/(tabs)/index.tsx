import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3498db" }]}
        onPress={() => router.push("/(tabs)/add")}
      >
        <Text style={styles.buttonText}>Add Person</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2ecc71" }]}
        onPress={() => router.push("/(tabs)/list")}
      >
        <Text style={styles.buttonText}>Show List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e74c3c" }]}
        onPress={() => router.push("/(tabs)/delete")}
      >
        <Text style={styles.buttonText}>Delete Person</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "85%",
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
