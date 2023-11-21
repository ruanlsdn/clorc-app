import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Label, XStack, YStack } from "tamagui";
import { useAxios } from "../../hooks";
import { iProduct } from "../../interfaces";
import { useApplicationControlContext } from "../../contexts";
import { axiosProductService } from "../../services";

type props = {
  isUpdate: boolean;
};

export default function UpsertProduct({ isUpdate }: props) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const { data, status, error, loading, fetchData } = useAxios<iProduct>();
  const { setIsCreateProductDialogOpen } = useApplicationControlContext();

  const handleSubmit = async () => {
    await fetchData(
      {
        axiosInstance: axiosProductService,
        method: "post",
        url: "",
      },
      {
        description,
        price: Number(price),
        userId: "439b0584-35b7-4486-b8a1-1165c19a26e1",
      }
    );

    if (status === 201) {
      setIsCreateProductDialogOpen(false);
    }
  };

  return (
    <>
      <YStack space>
        <YStack>
          <Label disabled color="#D9D9E3">
            Descrição:
          </Label>
          <Input onChangeText={(text) => setDescription(text)} bc="#D9D9E3" />
        </YStack>
        <XStack space>
          <YStack flex={1}>
            <Label disabled color="#D9D9E3">
              Valor unitário:
            </Label>
            <Input
              onChangeText={(text) => setPrice(text)}
              keyboardType="numeric"
              bc="#D9D9E3"
            />
          </YStack>
          {isUpdate && (
            <YStack flex={1}>
              <Label disabled color="#D9D9E3">
                Estoque:
              </Label>
              <Input
                onChangeText={(text) => setStock(text)}
                keyboardType="numeric"
                bc="#D9D9E3"
              />
            </YStack>
          )}
        </XStack>
      </YStack>
      <Button
        bc="#19C37D"
        marginTop="$8"
        elevationAndroid={5}
        pressStyle={{
          opacity: 0.5,
          borderColor: "#19C37D",
          backgroundColor: "#19C37D",
        }}
        onPress={handleSubmit}
      >
        Confirmar
      </Button>
    </>
  );
}

const styles = StyleSheet.create({});
