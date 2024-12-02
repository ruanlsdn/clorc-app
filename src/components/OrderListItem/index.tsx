import { BaggageClaim, List, Plus, X } from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { iProduct } from "../../interfaces";
import AvatarIcon from "../AvatarIcon";
import {
  useApplicationControlContext,
  useCartControlContext,
} from "../../contexts";

type props = {
  item: iProduct;
};

export default function OrderListItem({ item }: props) {
  const { setIsIncreaseAmountAlertOpen } = useApplicationControlContext();
  const {
    setSelectedProduct,
    getProductQuantityOnCart,
    removeProductFromCart,
  } = useCartControlContext();

  const quantity = getProductQuantityOnCart(item.id!);

  const handlePlusButton = () => {
    setSelectedProduct(item);
    setIsIncreaseAmountAlertOpen(true);
  };

  const handleXButton = () => {
    removeProductFromCart(item.id!);
  };

  return (
    <View style={styles.container}>
      <XStack space="$3" alignItems="center" justifyContent="center">
        <AvatarIcon icon={<BaggageClaim color="#ffffff" />} />
        <YStack>
          <Text fontWeight="bold" fontSize="$6" color="#ffffff">
            {item.description}
          </Text>
          <Text color="#D9D9E3" fontSize="$5">{`x${quantity}`}</Text>
        </YStack>
      </XStack>
      <XStack space="$3">
        <TouchableOpacity
          onPress={handlePlusButton}
          style={styles.buttonContainer}
        >
          <Plus color="#19C37D" />
        </TouchableOpacity>
        {quantity > 0 && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleXButton}
          >
            <X color="$red10Dark" />
          </TouchableOpacity>
        )}
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#343541',
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 6,
    height: 85,
    elevation: 5,
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    backgroundColor: "#565869",
    borderRadius: 100,
    elevation: 5,
  },
});
