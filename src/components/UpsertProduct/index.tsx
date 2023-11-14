import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Label, XStack, YStack } from "tamagui";

export default function UpsertProduct() {
  return (
    <>
      <YStack space>
        <YStack>
          <Label disabled color="#D9D9E3">
            Descrição:
          </Label>
          <Input bc="#D9D9E3" />
        </YStack>
        <XStack space>
          <YStack flex={1}>
            <Label disabled color="#D9D9E3">
              Valor unitário:
            </Label>
            <Input keyboardType="numeric" bc="#D9D9E3" />
          </YStack>
          {false && (
            <YStack flex={1}>
              <Label disabled color="#D9D9E3">
                Estoque:
              </Label>
              <Input keyboardType="numeric" bc="#D9D9E3" />
            </YStack>
          )}
        </XStack>
      </YStack>
      <Button
        bc="#19C37D"
        marginTop="$8"
        elevationAndroid={5}
        pressStyle={{
          opacity: 0.5,
          borderColor: "#19C37D",
          backgroundColor: "#19C37D",
        }}
      >
        Confirmar
      </Button>
    </>
  );
}

const styles = StyleSheet.create({});
