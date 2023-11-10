import { X } from "@tamagui/lucide-icons";
import React from "react";
import { View } from "react-native";
import {
  Adapt,
  Button,
  Dialog,
  Sheet,
  Unspaced
} from "tamagui";

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
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
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
          <Dialog.Title>{title}</Dialog.Title>

          <Dialog.Description>
            {description}
          </Dialog.Description>

          <View>{children}</View>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$-6"
                right="$6"
                size="$5"
                circular
                icon={X}
                bc={"red"}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
