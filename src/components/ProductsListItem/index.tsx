import {
  ChevronDown,
  ClipboardPaste,
  List,
  Pencil,
  Trash,
} from "@tamagui/lucide-icons";
import React, { useState } from "react";
import {
  Accordion,
  Avatar,
  Button,
  H4,
  Square,
  Switch,
  Text,
  XStack,
  YStack
} from "tamagui";
import { iProduct } from "../../interfaces";

type props = {
  item: iProduct;
};

export default function ProductsListItem({ item }: props) {
  const [isAdaptedDialogOpen, setIsAdaptedDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleOnPressEdit = () => {
    console.log(1)
    setIsAdaptedDialogOpen((prev) => !prev);
  };

  const handleOnPressDelete = () => {
    setIsAlertOpen((prev) => !prev);
  };

  return (
    <>
      <Accordion type="multiple" overflow="hidden">
        <Accordion.Item value={item.title}>
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <XStack space="$3" alignItems="center" justifyContent="center">
                  <Avatar circular size="$6">
                    <Avatar.Image
                      asChild
                      children={
                        <YStack
                          bc="$color.gray6Light"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <List size="$2.5" />
                        </YStack>
                      }
                    />
                  </Avatar>
                  <YStack>
                    <H4>{item.title}</H4>
                    <Text fontSize="$5">{`R$ ${item.price.toFixed(2)}`}</Text>
                  </YStack>
                </XStack>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <YStack space>
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$7">Contabilizar</Text>
                <Switch size="$3.5">
                  <Switch.Thumb animation={"100ms"} />
                </Switch>
              </XStack>
              <XStack space marginTop="$5" justifyContent="space-between">
                <Button onPress={handleOnPressEdit} bordered flex={1}>
                  <Pencil />
                </Button>
                <Button onPress={handleOnPressDelete} bordered flex={1}>
                  <Trash />
                </Button>
              </XStack>
            </YStack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
