import React, { useState } from "react";
import {FlatList, View, Text, StyleSheet, Button, Modal, TextInput } from "react-native";

export default function ExModal() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [texto, setTexto] = useState("");

  return (
    <View style={styles.container}>
      <Button title="Adicionar" onPress={() => setModalVisivel(true)} />

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.titulo}>Digite uma frase</Text>
            <TextInput
              placeholder="Digite aqui"
              style={styles.input}
              value={texto}
              onChangeText={setTexto}
            />
            <Button title="Fechar" onPress={() => setModalVisivel(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
