import { Search } from '@tamagui/lucide-icons';
import React, { useCallback, useState } from 'react';
import { Button, Input, XStack } from 'tamagui';

export type SearchbarProps = {
  placeholder: string;
  // Interface antiga (para compatibilidade)
  list?: any[];
  searchParameter?: string;
  onFilterUpdate?: (filtered: any[]) => void;
  // Interface nova (para scroll infinito)
  onSearch?: (searchTerm: string) => void;
  loading?: boolean;
};

export default function Searchbar({
  placeholder,
  // Props antigas
  list,
  searchParameter,
  onFilterUpdate,
  // Props novas
  onSearch,
  loading = false,
}: SearchbarProps) {
  const [text, setText] = useState('');

  // Função para busca local (interface antiga)
  const handleLocalSearch = useCallback(() => {
    if (list && searchParameter && onFilterUpdate) {
      const filteredList = list.filter((item) => 
        String(item[searchParameter]).toUpperCase().includes(text.toUpperCase())
      );
      onFilterUpdate(filteredList);
    }
  }, [list, searchParameter, onFilterUpdate, text]);

  // Função para busca no servidor (interface nova)
  const handleServerSearch = useCallback(() => {
    if (onSearch) {
      onSearch(text);
    }
  }, [onSearch, text]);

  const handleSearchButton = () => {
    if (onSearch) {
      // Interface nova - busca no servidor
      handleServerSearch();
    } else if (onFilterUpdate) {
      // Interface antiga - busca local
      handleLocalSearch();
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    
    // Se o texto estiver vazio, resetar a busca
    if (newText === '') {
      if (onSearch) {
        onSearch('');
      } else if (list && onFilterUpdate) {
        onFilterUpdate(list);
      }
    }
  };

  return (
    <XStack padding='$4' alignItems='center' justifyContent='center' bc='#202123'>
      <Input
        placeholder={placeholder}
        fontSize='$5'
        width='90%'
        bc='#565869'
        borderColor='#565869'
        borderTopRightRadius='$0'
        borderBottomRightRadius='$0'
        color='#ffffff'
        value={text}
        onChangeText={handleTextChange}
        editable={!loading}
      />
      <Button
        bc='#343541'
        borderTopLeftRadius='$0'
        borderBottomLeftRadius='$0'
        icon={<Search color='#19C37D' size='$1' />}
        pressStyle={{
          opacity: 0.5,
          borderColor: '#343541',
          backgroundColor: '#343541',
        }}
        onPress={handleSearchButton}
        disabled={loading}
      />
    </XStack>
  );
}
