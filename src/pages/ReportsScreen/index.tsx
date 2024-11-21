import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Alert, IncreaseAmount, ReportList, Searchbar } from '../../components';
import { useApplicationControlContext } from '../../contexts';

export interface Report {
  title: string;
  hasOptions: boolean;
}

export default function ReportsScreen() {  
  const reports: Report[] = [
    { title: 'Relatório de Vendas', hasOptions: true },
    { title: 'Relatório de Estoque', hasOptions: false },
  ];

  return (
    <>
      <Searchbar />
      <ReportList list={reports!} />
    </>
  );
}

const styles = StyleSheet.create({});
