import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    if (item.trim()) {
      setList([...list, { id: Date.now().toString(), name: item }]);
      setItem("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Lista de cumpărături</Text>

      <TextInput
        style={styles.input}
        placeholder="Adaugă produs..."
        value={item}
        onChangeText={setItem}
      />

      <Button title="Adaugă" onPress={addItem} />

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>• {item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, backgroundColor: "#fff" },
  item: { padding: 10, fontSize: 18, borderBottomWidth: 1, borderColor: "#ddd" }
});
