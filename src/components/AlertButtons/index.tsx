import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { XStack, AlertDialog, Button } from "tamagui";

type props = {
  handleCancelButton: () => void;
  handleConfirmButton: () => void;
};

export default function AlertButtons({
  handleCancelButton,
  handleConfirmButton,
}: props) {
  return (
    <XStack space="$3" justifyContent="center">
      <AlertDialog.Action bc="#565869" asChild>
        <Button
          pressStyle={{
            opacity: 0.5,
            borderColor: "#565869",
            backgroundColor: "#565869",
          }}
          elevationAndroid={5}
          color="$red11Light"
          onPress={handleCancelButton}
        >
          Cancelar
        </Button>
      </AlertDialog.Action>
      <AlertDialog.Action bc="#565869" asChild>
        <Button
          pressStyle={{
            opacity: 0.5,
            borderColor: "#565869",
            backgroundColor: "#565869",
          }}
          elevationAndroid={5}
          color="#19C37D"
          onPress={handleConfirmButton}
        >
          Confirmar
        </Button>
      </AlertDialog.Action>
    </XStack>
  );
}

const styles = StyleSheet.create({});
