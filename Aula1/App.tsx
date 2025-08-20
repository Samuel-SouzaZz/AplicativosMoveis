import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/cb/1e/16/cb1e169fb8f23f3a9dbd5b6d6d0bb289.jpg',
        }}
        style={{ width: 200, height: 200, borderRadius: 10 }}
      />
      <h1>BOTAFOGO MELHOR QUE VASCO</h1>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
