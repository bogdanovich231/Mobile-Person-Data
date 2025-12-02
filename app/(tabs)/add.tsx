import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackButton from "@/components/BackButton";

export default function AddPerson() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSave = async () => {
    if (!firstName || !lastName) {
      Alert.alert("Error", "First and last name are required");
      return;
    }

    const newPerson = { firstName, lastName, birthDate, phone, email, address };

    try {
      const stored = await AsyncStorage.getItem("people");
      const people = stored ? JSON.parse(stored) : [];
      people.push(newPerson);
      await AsyncStorage.setItem("people", JSON.stringify(people));
      Alert.alert("Success", "Person added!");

      setFirstName("");
      setLastName("");
      setBirthDate("");
      setPhone("");
      setEmail("");
      setAddress("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save person");
    }
  };

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = (date: Date) => {
    const formatted = date.toISOString().split("T")[0];
    setBirthDate(formatted);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />
        <Text style={styles.title}>Add New Person</Text>

        <TextInput
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#9b59b6"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#9b59b6"
          value={lastName}
          onChangeText={setLastName}
        />

        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={{ color: birthDate ? "#000" : "#9b59b6", fontSize: 16 }}>
            {birthDate || "Birth date"}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#9b59b6"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9b59b6"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#9b59b6"
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Person</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f0f4f7",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34495e",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#e74c3c",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
