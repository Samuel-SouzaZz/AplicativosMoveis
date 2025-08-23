import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, Button, Modal, TextInput, Image, TouchableOpacity, SafeAreaView } from "react-native";

type ItemType = {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string;
};

export default function ExModal() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [itens, setItens] = useState<ItemType[]>([]);

  const adicionarItem = () => {
    if (!titulo || !descricao || !imagemUrl) return;

    const novoItem = {
      id: Date.now().toString(),
      titulo,
      descricao,
      imagemUrl,
    };

    setItens((prevItens) => [...prevItens, novoItem]);
    setTitulo("");
    setDescricao("");
    setImagemUrl("");
    setModalVisivel(false);
  };

  const [imagemErro, setImagemErro] = useState<{ [key: string]: boolean }>({});

  const renderItem = ({ item }: { item: ItemType }) => (
    <View style={styles.itemContainer}>
      {imagemErro[item.id] ? (
        <View style={[styles.imagem, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
          <Text style={{ color: '#888' }}>Imagem não encontrada</Text>
        </View>
      ) : (
        <Image
          source={{ uri: item.imagemUrl }}
          style={styles.imagem}
          onError={() => setImagemErro((prev) => ({ ...prev, [item.id]: true }))}
        />
      )}
      <Text style={styles.itemTitulo}>{item.titulo}</Text>
      <Text>{item.descricao}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={itens}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>Nenhum item cadastrado</Text>}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => setModalVisivel(true)}
      >
        <Text style={styles.textoBotao}>Adicionar item</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.titulo}>Adicionar Novo Item</Text>
            <TextInput
              placeholder="Título"
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              placeholder="Descrição"
              style={styles.input}
              value={descricao}
              onChangeText={setDescricao}
            />
            <TextInput
              placeholder="URL da imagem"
              style={styles.input}
              value={imagemUrl}
              onChangeText={setImagemUrl}
            />
            <Button title="Adicionar" onPress={adicionarItem} />
            <View style={{ height: 10 }} />
            <Button title="Cancelar" onPress={() => setModalVisivel(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    padding: 20,
    paddingBottom: 80, // espaço para o botão fixo
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  titulo: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  botaoAdicionar: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  backgroundColor: "#1E90FF", // azul vibrante (pode trocar)
  paddingVertical: 16,
  borderRadius: 12,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 8, // para Android
},
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  itemTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  imagem: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
});