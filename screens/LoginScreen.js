import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { auth } from "../firebase-config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("Rampritsahani@gmail.com");
  const [password, setPassword] = useState("Ramprit@1234");
  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    const subscription = auth.onAuthStateChanged((authState) => {
      if (authState) {
        navigation.replace("Home");
      }
    });
    return () => subscription();
  }, [navigation]);

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
          type="email"
          placeholder="Email"
          autofocus
          value={email}
          inputContainer={styles.inputContainer}
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Input
          type="password"
          secureTextEntry
          placeholder="Password"
          value={password}
          inputContainer={styles.inputContainer}
          onChangeText={(text) => setPassword(text)}
        ></Input>

        <Button
          containerStyle={{ width: 100, marginLeft: 10 }}
          size="small"
          title="Login"
          onPress={handleLogin}
        />
        <Button
          containerStyle={{ marginLeft: 10 }}
          title="Create a new account"
          type="clear"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <View style={{ height: 10 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
