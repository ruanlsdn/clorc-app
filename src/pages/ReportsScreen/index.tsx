import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AdaptedDialog, ReportList, Searchbar, SellReportConfiguration } from '../../components';
import { useApplicationControlContext } from '../../contexts';

export interface Report {
  id: number;
  title: string;
  hasOptions: boolean;
}

export default function ReportsScreen() {
  const { isSellReportSettingsDialogOpen, setIsSellReportSettingsDialogOpen } = useApplicationControlContext();

  const reports: Report[] = [
    { id: 1, title: 'Relatório de Vendas', hasOptions: true },
    { id: 2, title: 'Relatório de Estoque', hasOptions: false },
  ];

  const [filteredReports, setFilteredReports] = useState(reports);

  return (
    <>
      <Searchbar
        placeholder='Pesquisar relatório...'
        list={reports}
        searchParameter='title'
        onFilterUpdate={setFilteredReports}
      />
      <ReportList list={filteredReports} />
      <AdaptedDialog
        isOpen={isSellReportSettingsDialogOpen}
        setIsOpen={setIsSellReportSettingsDialogOpen}
        title='Configurar'
        description='Selecione um período pré-definido ou preencha os dados e confirme para gerar o relatório: '
        children={<SellReportConfiguration />}
      />
    </>
  );
}

const styles = StyleSheet.create({});
