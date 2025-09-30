import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Dog } from "../model/dogs";
import { useTheme } from "../context/ThemeContext";

interface DogViewProps {
  dogs: Dog[];
  deleteDog: (id: string) => void;
}

export const DogView: React.FC<DogViewProps> = ({ dogs, deleteDog }) => {
  const { theme } = useTheme();

  const renderDog = ({ item }: { item: Dog }) => (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: theme.colors.cardBackground },
      ]}
    >
      {item.image && item.image !== "default-image" ? (
        <Image
          source={{ uri: item.image }}
          style={styles.dogImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderEmoji}>🐕</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.dogName, { color: theme.colors.text }]}>
          {item.name}
        </Text>
        <Text
          style={[styles.dogDescription, { color: theme.colors.textSecondary }]}
          numberOfLines={1}
        >
          {item.description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteDog(item.id)}
        style={[
          styles.deleteButton,
          { backgroundColor: theme.colors.deleteButtonBg },
        ]}
      >
        <Text style={[styles.deleteText, { color: theme.colors.deleteButton }]}>
          ✕
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={dogs}
        renderItem={renderDog}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  cardContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dogImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#e8f0fe",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderEmoji: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  dogName: {
    fontWeight: "600",
    fontSize: 15,
  },
  dogDescription: {
    marginTop: 2,
    fontSize: 13,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
