import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomListItem = ({ data, handleOnChat }) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => handleOnChat(data.id, data.chatName)}
    >
      <Avatar
        source={{
          uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{data.chatName}</ListItem.Title>
        <ListItem.Subtitle numOfLines={1}>{"CEO"}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
