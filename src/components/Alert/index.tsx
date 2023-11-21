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
          animation="100ms"
          opacity={0.5}
          enterStyle={{ opacity: 1 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          key="content"
          animation={[
            "100ms",
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
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
