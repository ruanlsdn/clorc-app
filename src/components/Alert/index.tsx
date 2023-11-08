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
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
          bordered
          elevate
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
        >
          <YStack space>
            <AlertDialog.Title alignSelf="center">{title}</AlertDialog.Title>

            <AlertDialog.Description alignSelf="center">
              {description}
            </AlertDialog.Description>

            <View>{children}</View>

            <XStack space="$3" justifyContent="center">
              <AlertDialog.Cancel asChild>
                <Button>Cancelar</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button>Confirmar</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
