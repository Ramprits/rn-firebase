import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase-config";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add New Chat",
    });
    return () => {};
  }, [navigation]);
  const handleSubmit = async () => {
    if (input) {
      await db
        .collection("chats")
        .add({
          chatName: input,
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Please enter chat name");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Chat Name"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        onChangeText={(value) => setInput(value)}
        onSubmitEditing={handleSubmit}
      />

      <Button
        containerStyle={{ width: 100, marginLeft: 10 }}
        onPress={handleSubmit}
        title="Create"
      ></Button>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    width: 300,
  },
  buttonContainer: {
    width: 10,
  },
});
