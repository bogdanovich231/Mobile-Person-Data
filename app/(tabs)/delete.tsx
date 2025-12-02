import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeletePerson() {
  const [people, setPeople] = useState([]);

  const loadPeople = async () => {
    try {
      const stored = await AsyncStorage.getItem("people");
      setPeople(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleDelete = async (index) => {
    const updated = [...people];
    updated.splice(index, 1);
    setPeople(updated);
    await AsyncStorage.setItem("people", JSON.stringify(updated));
    Alert.alert("Deleted", "Person removed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete People</Text>
      {people.length === 0 ? (
        <Text>No people to delete</Text>
      ) : (
        <FlatList
          data={people}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
              <Button
                title="Delete"
                onPress={() => handleDelete(index)}
                color="#e74c3c"
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
