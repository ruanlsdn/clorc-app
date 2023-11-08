import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type props = {
  icon: React.ReactNode;
  handleFunction: () => void;
};

export default function ButtonHeaderRight({
  icon,
  handleFunction,
}: props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={handleFunction}>{icon}</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    btn: {
        marginRight: 10,
    }
})