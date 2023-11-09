import { View, Text } from "react-native";
import React from "react";
import { HistoryList, Searchbar } from "../../components";
import { iHistoryOrder } from "../../interfaces";

const dummy: iHistoryOrder[] = [
  {
    clientName: "Ruan Lucas",
    createdAt: "10/10/2000",
  },
  {
    clientName: "Ruan Lucas",
    createdAt: "10/10/2000",
  },
  {
    clientName: "Ruan Lucas",
    createdAt: "10/10/2000",
  },
  {
    clientName: "Ruan Lucas",
    createdAt: "10/10/2000",
  },
  {
    clientName: "Ruan Lucas",
    createdAt: "10/10/2000",
  },
  {
    clientName: "Ruan Lucas",
    createdAt: "10/10/2000",
  },
  {
    clientName: "Ruan Lucas",
    createdAt: "10/10/2000",
  },
];

export default function HistoryScreen() {
  return (
    <>
      <Searchbar />
      <HistoryList list={dummy} />
    </>
  );
}
