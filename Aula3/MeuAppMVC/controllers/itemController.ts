import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Item } from '../models/item';
import ItemService from '../services/itemService';

export const useItemController = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const allItems = ItemService.getAllItems();
    setItems([...allItems]);
  };

  const generateId = () => Date.now().toString();

  const addItem = () => {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }

    const newItem: Item = {
      id: generateId(),
      title: inputText.trim(),
    };

    ItemService.addItem(newItem);
    loadItems();
    closeModal();
  };

  const updateItem = () => {
    if (!inputText.trim() || !editingItem) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }

    const updatedItem: Item = {
      ...editingItem,
      title: inputText.trim(),
    };

    ItemService.updateItem(updatedItem);
    loadItems();
    closeModal();
  };

  const deleteItem = () => {
    if (!editingItem) return;

    ItemService.deleteItem(editingItem.id);
    loadItems();
    closeModal();
  };

  const openAddModal = () => {
    setInputText('');
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item: Item) => {
    setInputText(item.title);
    setEditingItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setInputText('');
    setEditingItem(null);
    setModalVisible(false);
  };

  return {
    items,
    inputText,
    setInputText,
    modalVisible,
    editingItem,
    addItem,
    updateItem,
    deleteItem,
    openAddModal,
    openEditModal,
    closeModal,
  };
};