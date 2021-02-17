import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { db, firebase, auth } from "../firebase-config";
import { Avatar } from "react-native-elements";

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName ? route.params.chatName : "Chat Details",
      headerTitleStyle: { color: "white" },

      headerRight: () => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 80,
            justifyContent: "space-around",
            marginRight: 20,
          }}
        >
          <FontAwesome
            name="video-camera"
            size="24"
            color="white"
          ></FontAwesome>
          <Ionicons name="call" size="24" color="white"></Ionicons>
        </TouchableOpacity>
      ),
    });
    return () => {};
  }, [navigation]);
  useEffect(() => {
    const subscription = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", auth.currentUser.email ? "asc" : "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => subscription;
  }, [route]);

  const handleOnSend = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    });
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keybordeVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) => {
                return data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receivers}>
                    <Avatar
                      rounded
                      source={{
                        uri:
                          "https://www.popsci.com/resizer/oBw2zifFCqH3deU6vy2bPRSG99Q=/760x456/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/WMD5M52LJFBEBIHNEEABHVB6LA.jpg",
                      }}
                    />
                    <Text>{data.message} </Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      source={{
                        uri:
                          "https://www.popsci.com/resizer/oBw2zifFCqH3deU6vy2bPRSG99Q=/760x456/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/WMD5M52LJFBEBIHNEEABHVB6LA.jpg",
                      }}
                    />
                    <Text>{data.message}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={message}
                style={styles.textInput}
                placeholder="Signal Name"
                onChangeText={(text) => setMessage(text)}
              ></TextInput>
              <TouchableOpacity>
                <Ionicons
                  name="send"
                  onPress={handleOnSend}
                  size="34"
                  color="#2B68E6"
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receivers: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2C6BED",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
});
