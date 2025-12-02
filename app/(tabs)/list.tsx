import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListPeople() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>People List</Text>
      {people.length === 0 ? (
        <Text>No people added yet</Text>
      ) : (
        <FlatList
          data={people}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
              <Text>{item.birthDate}</Text>
              <Text>
                {item.phone} | {item.email}
              </Text>
              <Text>{item.address}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
});
