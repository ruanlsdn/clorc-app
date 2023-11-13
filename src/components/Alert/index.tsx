import { View, Text } from "react-native";
import React from "react";
import { AlertDialog, Button, XStack, YStack } from "tamagui";

type props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Alert({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
}: props) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          bc="#202123"
        >
          <YStack space>
            <AlertDialog.Title color="#ffffff" alignSelf="center">
              {title}
            </AlertDialog.Title>

            <AlertDialog.Description
              fontSize="$5"
              color="#D9D9E3"
              alignSelf="center"
              textAlign="center"
            >
              {description}
            </AlertDialog.Description>

            <View>{children}</View>

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
                  onPress={() => setIsOpen(false)}
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
                  onPress={() => setIsOpen(false)}
                >
                  Confirmar
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
