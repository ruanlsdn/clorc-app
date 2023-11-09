import { Box, ChevronDown, List, Pencil, Trash } from "@tamagui/lucide-icons";
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
  YStack,
} from "tamagui";
import { iProduct } from "../../interfaces";

type props = {
  item: iProduct;
};

export default function ProductsListItem({ item }: props) {
  const [isAdaptedDialogOpen, setIsAdaptedDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleOnPressEdit = () => {
    console.log(1);
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
            {({ open }: { open: boolean }) => (
              <>
                <XStack space="$3" alignItems="center" justifyContent="center">
                  <Avatar circular size="$5">
                    <Avatar.Image
                      asChild
                      children={
                        <YStack
                          bc="$color.gray6Light"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <List size="$1.5" />
                        </YStack>
                      }
                    />
                  </Avatar>
                  <YStack>
                    <Text fontWeight="bold" fontSize="$6">
                      {item.title}
                    </Text>
                    <Text fontSize="$4">{`R$ ${item.price.toFixed(2)}`}</Text>
                  </YStack>
                </XStack>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <YStack space marginTop="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$6">Contabilizar</Text>
                <Switch size="$3">
                  <Switch.Thumb animation={"100ms"} />
                </Switch>
              </XStack>
              <XStack space marginTop="$3" justifyContent="space-between">
                <Button onPress={handleOnPressEdit} bordered flex={1}>
                  <Pencil />
                </Button>
                <Button onPress={handleOnPressEdit} bordered flex={1}>
                  <Box />
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
