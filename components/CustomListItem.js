import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  {
    name: "Ramprit Sahani",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "CEO",
  },
];

const CustomListItem = ({ data }) => {
  return (
    <View>
      <ListItem bottomDivider>
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
    </View>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
