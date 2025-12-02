import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#e74c3c",
        tabBarInactiveTintColor: "#95a5a6",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2c3e50",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="th-list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "Add person",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="delete"
        options={{
          title: "Delete person",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user-delete" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
