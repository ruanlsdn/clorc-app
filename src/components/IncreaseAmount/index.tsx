import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Label, Input, AlertDialog, XStack, Button } from "tamagui";
import {
  useApplicationControlContext,
  useCartControlContext,
} from "../../contexts";
import { applyAlwaysIntegerMask } from "../../helpers/utils";
import { useToastController } from "@tamagui/toast";
import { XCircle } from "@tamagui/lucide-icons";

export default function IncreaseAmount() {
  const { setIsIncreaseAmountAlertOpen } = useApplicationControlContext();
  const { selectedProduct, upsertProductOnCart } = useCartControlContext();
  const toast = useToastController();
  
  const [quantity, setQuantity] = useState('');

  const handleCancelButton = () => {
    setIsIncreaseAmountAlertOpen(false);
  };

  const handleConfirmButton = () => {
    if (quantity === '') {
      toast.show('Ocorreu um erro!', {
        message: 'Existem campos não preenchidos.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });

      return;
    }

    if (quantity === '0') {
      toast.show('Ocorreu um erro!', {
        message: 'Quantidade inválida.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });

      return;
    }

    upsertProductOnCart({
      id: selectedProduct?.id,
      description: selectedProduct?.description,
      price: selectedProduct?.price,
      quantity: Number(quantity),
    });

    setIsIncreaseAmountAlertOpen(false);
  };
  return (
    <>
      <View style={styles.container}>
        <Label fontSize="$4" color="#D9D9E3" width={90} htmlFor="name">
          Quantidade:
        </Label>
        <Input
          autoFocus
          fontSize="$6"
          keyboardType="numeric"
          textAlign="center"
          maxWidth={100}
          id="name"
          bc="#D9D9E3"
          onChangeText={(text) => setQuantity(applyAlwaysIntegerMask(text))}
          value={quantity}
        />
      </View>
      <XStack space="$3" justifyContent="center">
        <AlertDialog.Action bc="#565869" asChild>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: "#565869",
              backgroundColor: "#565869",
            }}
            elevationAndroid={5}
            color="$red10Dark"
            onPress={handleCancelButton}
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
            onPress={handleConfirmButton}
          >
            Confirmar
          </Button>
        </AlertDialog.Action>
      </XStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
});
