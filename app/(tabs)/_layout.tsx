import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLanguage } from "@/hooks/i18n";

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t.home,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: t.list,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="th-list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: t.add,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="delete"
        options={{
          title: t.delete,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user-delete" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
