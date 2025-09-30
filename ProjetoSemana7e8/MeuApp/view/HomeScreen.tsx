import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const HomeScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Bem-vindo!
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Gerencie seus cachorros
      </Text>

      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: theme.colors.primary }]}
        onPress={toggleTheme}
      >
        <Text style={styles.themeButtonText}>
          {theme.isDark ? "Tema Claro" : "Tema Escuro"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  themeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
  },
  themeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
