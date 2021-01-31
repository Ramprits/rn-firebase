import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { auth } from "../firebase-config";

const RegisterScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back To Login",
    });
  }, [navigation]);
  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName,
          photoUrl: profileUrl
            ? profileUrl
            : "https://forum.processmaker.com/download/file.php?avatar=93310_1550846185.png",
        });
        navigation.replace("Home");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://cdn.dribbble.com/users/528264/screenshots/3140440/firebase_logo.png?compress=1&resize=400x300",
        }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      ></Image>
      <View style={styles.inputContainer}>
        <Input
          type="text"
          placeholder="Full Name"
          autofocus
          inputContainer={styles.inputContainer}
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
        ></Input>
        <Input
          type="email"
          placeholder="Email"
          autofocus
          inputContainer={styles.inputContainer}
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Input
          type="password"
          secureTextEntry
          placeholder="Password"
          onPress={handleRegister}
          value={password}
          inputContainer={styles.inputContainer}
          onChangeText={(text) => setPassword(text)}
        ></Input>

        <Button
          containerStyle={{ width: 100, marginLeft: 10 }}
          title="Register"
          size="small"
          onPress={handleRegister}
        />
        <Button
          containerStyle={{ marginLeft: 10, borderBottomColor: "red" }}
          title="Do you have an account?"
          type="clear"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <View style={{ height: 10 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    margin: 10,
    width: 300,
  },
  buttonStyle: {
    marginTop: 10,
  },
});
