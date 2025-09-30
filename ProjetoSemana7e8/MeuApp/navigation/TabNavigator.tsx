import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { HomeScreen } from "../view/HomeScreen";
import { DogView } from "../view/home";
import { Dog } from "../model/dogs";
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
  onAddPress: () => void;
  dogs: Dog[];
  deleteDog: (id: string) => void;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({
  onAddPress,
  dogs,
  deleteDog,
}) => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
          tabBarLabel: "Início",
          tabBarIcon: () => null,
        }}
      />

      <Tab.Screen
        name="Add"
        component={View}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            onAddPress();
          },
        }}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View
              style={[
                styles.addButton,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.addButtonText}>+</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Lista"
        options={{
          title: "Meus Cachorros",
          tabBarLabel: "Lista",
          tabBarIcon: () => null,
        }}
      >
        {() => <DogView dogs={dogs} deleteDog={deleteDog} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "300",
  },
});
