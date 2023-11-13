import React from "react";
import { View } from "react-native";
import { Adapt, Dialog, Sheet, XStack } from "tamagui";

type props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdaptedDialog({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
}: props) {
  return (
    <Dialog
      open={isOpen}
      modal
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Adapt when="sm" platform="touch">
        <Sheet animation="quick" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame bc="#202123" padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="100ms"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="100ms"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
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
          gap="$4"
        >
          <XStack alignSelf="center" bc="#19C37D" width="$5" height="$0.5" />

          <Dialog.Title color="#ffffff" alignSelf="center">
            {title}
          </Dialog.Title>

          <Dialog.Description fontSize="$4" color="#D9D9E3" textAlign="center">
            {description}
          </Dialog.Description>

          <View>{children}</View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
