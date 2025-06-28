import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { YStack } from 'tamagui';
import { AdaptedDialog, MenuConfiguration, ReportList, Searchbar, SellReportConfiguration } from '../../components';
import { useApplicationControlContext } from '../../contexts';

export interface Report {
  id: number;
  title: string;
  hasOptions: boolean;
}

export default function ReportsScreen() {
  const { 
    isSellReportSettingsDialogOpen, 
    setIsSellReportSettingsDialogOpen,
    isMenuConfigurationDialogOpen,
    setIsMenuConfigurationDialogOpen
  } = useApplicationControlContext();

  const reports: Report[] = [
    { id: 1, title: 'Relatório de Vendas', hasOptions: true },
    { id: 2, title: 'Relatório de Estoque', hasOptions: false },
    { id: 3, title: 'Cardápio', hasOptions: true },
  ];

  const [filteredReports, setFilteredReports] = useState(reports);

  return (
    <YStack flex={1} bc='#202123'>
      <Searchbar
        placeholder='Pesquisar relatório...'
        list={reports}
        searchParameter='title'
        onFilterUpdate={setFilteredReports}
      />
      <ReportList list={filteredReports} />
      
      {/* Diálogo de configuração do relatório de vendas */}
      <AdaptedDialog
        isOpen={isSellReportSettingsDialogOpen}
        setIsOpen={setIsSellReportSettingsDialogOpen}
        title='Configurar'
        description='Selecione um período pré-definido ou preencha os dados e confirme para gerar o relatório: '
        children={<SellReportConfiguration />}
      />
      
      {/* Diálogo de configuração do cardápio */}
      <AdaptedDialog
        isOpen={isMenuConfigurationDialogOpen}
        setIsOpen={setIsMenuConfigurationDialogOpen}
        title='Configurar Cardápio'
        description='Personalize os textos do rodapé do cardápio:'
        children={<MenuConfiguration />}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({});
