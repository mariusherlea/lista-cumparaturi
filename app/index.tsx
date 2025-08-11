import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  // 🔹 Încarcă lista salvată la pornire
  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    try {
      const savedList = await AsyncStorage.getItem("shoppingList");
      if (savedList) {
        setList(JSON.parse(savedList));
      }
    } catch (error) {
      console.log("Eroare la citirea listei:", error);
    }
  };

  const saveList = async (newList) => {
    try {
      await AsyncStorage.setItem("shoppingList", JSON.stringify(newList));
    } catch (error) {
      console.log("Eroare la salvarea listei:", error);
    }
  };

  const addItem = () => {
    if (item.trim()) {
      const newList = [...list, { id: Date.now().toString(), name: item, bought: false }];
      setList(newList);
      saveList(newList);
      setItem("");
    }
  };

  const toggleBought = (id) => {
    const newList = list.map(product =>
      product.id === id ? { ...product, bought: !product.bought } : product
    );
    setList(newList);
    saveList(newList);
  };

  const deleteItem = (id) => {
    const newList = list.filter(product => product.id !== id);
    setList(newList);
    saveList(newList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Pressable onPress={() => toggleBought(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.item, item.bought && styles.bought]}>
          • {item.name}
        </Text>
      </Pressable>
      <Pressable onPress={() => deleteItem(item.id)}>
        <Text style={styles.delete}>❌</Text>
      </Pressable>
    </View>
  );

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
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, backgroundColor: "#fff" },
  itemContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  item: { padding: 10, fontSize: 18 },
  bought: { textDecorationLine: "line-through", color: "gray" },
  delete: { fontSize: 18, padding: 10 }
});
