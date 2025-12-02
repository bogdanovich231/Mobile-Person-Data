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
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: () => (
            <FontAwesome name="th-list" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add person",
          tabBarIcon: () => (
            <Ionicons name="person-add-sharp" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="delete"
        options={{
          title: "Delete person",
          tabBarIcon: () => (
            <AntDesign name="user-delete" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
