import React, { useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./navigation/TabNavigator";
import { useDogController } from "./controller/dogController";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

interface AppState {
  modalVisible: boolean;
  inputName: string;
  inputDescription: string;
}

type AppAction =
  | { type: "SET_MODAL_VISIBLE"; payload: boolean }
  | { type: "SET_INPUT_NAME"; payload: string }
  | { type: "SET_INPUT_DESCRIPTION"; payload: string }
  | { type: "RESET_INPUTS" };

const initialState: AppState = {
  modalVisible: false,
  inputName: "",
  inputDescription: "",
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_MODAL_VISIBLE":
      return { ...state, modalVisible: action.payload };
    case "SET_INPUT_NAME":
      return { ...state, inputName: action.payload };
    case "SET_INPUT_DESCRIPTION":
      return { ...state, inputDescription: action.payload };
    case "RESET_INPUTS":
      return { ...state, inputName: "", inputDescription: "" };
    default:
      return state;
  }
};

function AppContent() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { dogs, loading, errors, addDog, deleteDog, clearErrors } =
    useDogController();
  const { theme } = useTheme();

  const handleAddDog = async () => {
    const success = await addDog(state.inputName, state.inputDescription);
    if (success) {
      dispatch({ type: "RESET_INPUTS" });
      dispatch({ type: "SET_MODAL_VISIBLE", payload: false });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_MODAL_VISIBLE", payload: false });
    dispatch({ type: "RESET_INPUTS" });
    clearErrors();
  };

  return (
    <NavigationContainer>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <TabNavigator
          onAddPress={() =>
            dispatch({ type: "SET_MODAL_VISIBLE", payload: true })
          }
          dogs={dogs}
          deleteDog={deleteDog}
        />
        <StatusBar style="auto" />

        <Modal visible={state.modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: theme.colors.cardBackground },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Novo Cachorro
              </Text>

              <View>
                <TextInput
                  value={state.inputName}
                  onChangeText={(text) =>
                    dispatch({ type: "SET_INPUT_NAME", payload: text })
                  }
                  placeholder="Nome *"
                  placeholderTextColor={theme.colors.textSecondary}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.name
                        ? "#dc3545"
                        : theme.colors.border,
                      color: theme.colors.text,
                      backgroundColor: theme.colors.background,
                    },
                  ]}
                />
                {errors.name && (
                  <Text style={styles.errorText}> {errors.name}</Text>
                )}
              </View>

              <View>
                <TextInput
                  value={state.inputDescription}
                  onChangeText={(text) =>
                    dispatch({ type: "SET_INPUT_DESCRIPTION", payload: text })
                  }
                  placeholder="Descrição *"
                  placeholderTextColor={theme.colors.textSecondary}
                  multiline
                  numberOfLines={2}
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      borderColor: errors.description
                        ? "#dc3545"
                        : theme.colors.border,
                      color: theme.colors.text,
                      backgroundColor: theme.colors.background,
                    },
                  ]}
                />
                {errors.description && (
                  <Text style={styles.errorText}> {errors.description}</Text>
                )}
              </View>

              <Text style={styles.helperText}>
                A imagem será adicionada automaticamente!
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAddDog}
                  disabled={loading}
                  style={[
                    styles.addButton,
                    loading && styles.addButtonDisabled,
                  ]}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator size="small" color="white" />
                      <Text style={styles.addButtonTextLoading}>
                        Buscando...
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.addButtonText}>Adicionar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  textArea: {
    height: 70,
    textAlignVertical: "top",
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 14,
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 14,
  },
  addButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#6c757d",
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  addButtonTextLoading: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
