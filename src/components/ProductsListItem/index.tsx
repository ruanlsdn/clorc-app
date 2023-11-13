import { ChevronDown, Pencil, ShoppingBag, Trash } from "@tamagui/lucide-icons";
import React from "react";
import {
  Accordion,
  Button,
  Square,
  Switch,
  Text,
  XStack,
  YStack
} from "tamagui";
import { useApplicationControlContext } from "../../contexts";
import { iProduct } from "../../interfaces";
import AvatarIcon from "../AvatarIcon";

type props = {
  item: iProduct;
};

export default function ProductsListItem({ item }: props) {
  const { setIsEditProductDialogOpen, setIsDeleteProductAlertOpen } = useApplicationControlContext();

  const handleOnPressEdit = () => {
    setIsEditProductDialogOpen(true);
  };

  const handleOnPressDelete = () => {
    setIsDeleteProductAlertOpen(true);
  };

  return (
    <>
      <Accordion type="multiple" overflow="hidden" borderRadius="$5">
        <Accordion.Item value={item.title}>
          <Accordion.Trigger
            flexDirection="row"
            justifyContent="space-between"
            bc="#343541"
            borderColor="#343541"
            height="$8"
            pressStyle={{
              opacity: 0.8,
              backgroundColor: "#343541",
            }}
          >
            {({ open }: { open: boolean }) => (
              <>
                <XStack space="$3" alignItems="center" justifyContent="center">
                  <AvatarIcon icon={<ShoppingBag color="#ffffff" />} />
                  <YStack>
                    <Text fontWeight="bold" fontSize="$6" color="#ffffff">
                      {item.title}
                    </Text>
                    <Text
                      color="#D9D9E3"
                      fontSize="$5"
                    >{`R$ ${item.price.toFixed(2)}`}</Text>
                  </YStack>
                </XStack>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown color="#ffffff" size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content bc="#565869">
            <YStack space marginTop="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text color="#ffffff" fontSize="$6">
                  Contabilizar
                </Text>
                <Switch size="$3" bc="#343541" borderColor="#40414F">
                  <Switch.Thumb bc="#D9D9E3" animation={"100ms"} />
                </Switch>
              </XStack>
              <XStack space marginTop="$3" justifyContent="space-between">
                <Button
                  elevationAndroid={5}
                  pressStyle={{
                    opacity: 0.5,
                    borderColor: "#343541",
                    backgroundColor: "#343541",
                  }}
                  bc="#343541"
                  onPress={handleOnPressEdit}
                  flex={1}
                >
                  <Pencil color="#D9D9E3" />
                </Button>
                <Button
                  elevationAndroid={5}
                  pressStyle={{
                    opacity: 0.5,
                    borderColor: "#343541",
                    backgroundColor: "#343541",
                  }}
                  bc="#343541"
                  onPress={handleOnPressDelete}
                  flex={1}
                >
                  <Trash color="#D9D9E3" />
                </Button>
              </XStack>
            </YStack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
