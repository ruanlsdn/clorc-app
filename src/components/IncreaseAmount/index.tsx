import { View, StyleSheet } from "react-native";
import React from "react";
import { Label, Input } from "tamagui";

export default function IncreaseAmount() {
  return (
    <View style={styles.container}>
      <Label fontSize="$4" color="#ffffff" width={90} htmlFor="name">
        Quantidade:
      </Label>
      <Input
        autoFocus
        fontSize="$6"
        keyboardType="numeric"
        textAlign="center"
        maxWidth={100}
        id="name"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
});
