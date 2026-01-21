import { useCallback, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "@/components/BackButton";
import { useFocusEffect } from "expo-router";
import { useLanguage } from "@/hooks/i18n";

export default function DeletePerson() {
  const [people, setPeople] = useState([]);
  const { t } = useLanguage();

  const loadPeople = async () => {
    try {
      const stored = await AsyncStorage.getItem("people");
      setPeople(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPeople();
    }, []),
  );

  const handleDelete = async (index) => {
    const updated = [...people];
    updated.splice(index, 1);
    setPeople(updated);
    await AsyncStorage.setItem("people", JSON.stringify(updated));
    Alert.alert("Deleted", "Person removed");
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>{t.delete}</Text>
      {people.length === 0 ? (
        <Text>{t.noPeople}</Text>
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
                title={t.delete}
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
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "#f0f4f7",
  },
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
