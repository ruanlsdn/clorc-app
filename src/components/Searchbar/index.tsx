import { Search } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { Button, Input, XStack } from 'tamagui';

export type SearchbarProps = {
  placeholder: string;
  list: any[];
  searchParameter: string;
  onFilterUpdate: (filtered: any[]) => void;
};

export default function Searchbar({
  placeholder,
  list,
  searchParameter: searchParameter,
  onFilterUpdate,
}: SearchbarProps) {
  const [text, setText] = useState('');

  const handleSearchButton = () => {
    const filteredList = list.filter((item) => String(item[searchParameter]).toUpperCase().includes(text.toUpperCase()));
    onFilterUpdate(filteredList);
  };

  useEffect(() => {
    if (text === '') {
      onFilterUpdate(list);
    }
  }, [text]);

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
        onChangeText={(text) => setText(text)}
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
      />
    </XStack>
  );
}
