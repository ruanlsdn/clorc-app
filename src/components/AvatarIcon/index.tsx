import { View, Text, StyleSheet } from "react-native";
import React from "react";

type props = {
  icon: React.ReactNode;
};

export default function Avataricon({ icon }: props) {
  return <View style={styles.avatarContainer}>{icon}</View>;
}

const styles = StyleSheet.create({
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#565869",
    elevation: 5,
    borderRadius: 100,
    width: 55,
    height: 55,
  },
});
