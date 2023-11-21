import { ClipboardPaste, RefreshCcw } from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, XStack } from "tamagui";
import { CartList } from "../../components";
import { useCartControlContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const {
    cartProducts,
    getTotalPriceOnCart,
    getTotalQuantityOnCart,
    removeAllProductsFromCart,
  } = useCartControlContext();
  const { goBack } = useNavigation();

  const handleRefreshButton = () => {
    removeAllProductsFromCart();
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartContainer}>
        <CartList list={cartProducts} />
      </View>
      <View style={styles.div} />
      <View style={styles.summaryContainer}>
        <XStack space="$2" alignSelf="flex-end" marginTop="$4">
          <Text fontSize="$6" color="#D9D9E3">
            Itens incluídos:
          </Text>
          <Text fontSize="$6" fontWeight="bold" color="#ffffff">
            x{getTotalQuantityOnCart()}
          </Text>
        </XStack>
        <XStack space="$2" alignSelf="flex-end" marginBottom="$4">
          <Text fontSize="$6" color="#D9D9E3">
            Somatório:
          </Text>
          <Text fontSize="$6" fontWeight="bold" color="#ffffff">
            R$ {getTotalPriceOnCart()}
          </Text>
        </XStack>
        <XStack space justifyContent="space-between">
          <Button
            bc="#343541"
            flex={1}
            elevationAndroid={5}
            pressStyle={{
              opacity: 0.5,
              borderColor: "#343541",
              backgroundColor: "#343541",
            }}
            onPress={handleRefreshButton}
          >
            <RefreshCcw color="#D9D9E3" />
          </Button>
          <Button
            bc="#343541"
            flex={1}
            elevationAndroid={5}
            pressStyle={{
              opacity: 0.5,
              borderColor: "#343541",
              backgroundColor: "#343541",
            }}
          >
            <ClipboardPaste color="#D9D9E3" />
          </Button>
        </XStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202123",
  },
  cartContainer: {
    flex: 4,
    backgroundColor: "#202123",
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: "#202123",
    paddingHorizontal: 10,
  },
  div: {
    marginHorizontal: 45,
    backgroundColor: "#19C37D",
    height: 0.5,
  },
});
