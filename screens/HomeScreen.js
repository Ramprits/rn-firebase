import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase-config";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    const subscription = db.collection("chats").onSnapshot((snapshot) => {
      const snapshotData = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      setChats(snapshotData);
    });
    return () => subscription;
  }, [chats]);

  const handleOnChat = (id, chatName) => {
    console.log("id, chatName", id, chatName);
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerTitleAlign: "right",
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            ></Avatar>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            width: 60,
          }}
        >
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} />
          </TouchableOpacity>

          <TouchableOpacity>
            <SimpleLineIcons
              name="pencil"
              onPress={() => navigation.navigate("AddChat")}
              size={23}
              activeOpacity={0.5}
            />
          </TouchableOpacity>
        </View>
      ),
    });
    return () => {};
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        {chats.map((c) => (
          <CustomListItem
            key={c.id}
            {...c}
            handleOnChat={() => handleOnChat(c.id, c.data.chatName)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
