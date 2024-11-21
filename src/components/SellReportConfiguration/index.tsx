import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Calendar } from '@tamagui/lucide-icons';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Label, XStack, YStack } from 'tamagui';
import { userId } from '../../../userId';
import { useApplicationControlContext } from '../../contexts';
import { useAxios } from '../../hooks';
import { iCard } from '../../interfaces';
import { axiosCardService } from '../../services';

export default function IncreaseAmount() {
  const { setIsSellReportSettingsDialogOpen } = useApplicationControlContext();
  const { data: ordersPerPeriod, fetchData } = useAxios<iCard, iCard[]>();
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

  const currentDate = new Date();

  const showDatePickerInitialDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: onChangeInitialDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const onChangeInitialDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setInitialDate(currentDate);
  };

  const showDatePickerFinalDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: onChangeFinalDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const onChangeFinalDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setFinalDate(currentDate);
  };

  const handleOnPressPeriod = (amount: number, unit: moment.unitOfTime.DurationConstructor) => {
    const newDate = moment().subtract(amount, unit);
    setFinalDate(newDate.toDate());
  };

  const handleCancelButton = () => {
    setIsSellReportSettingsDialogOpen(false);
  };

  const handleConfirmButton = async () => {
    await fetchData({
      axiosInstance: axiosCardService,
      method: 'get',
      url: `/user/${userId}/period?initialDate=${initialDate}&finalDate=${finalDate}`,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <XStack gap={10} padding={3}>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(0, 'days')}
          >
            Hoje
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(7, 'days')}
          >
            7 dias
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(1, 'months')}
          >
            1 mês
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(3, 'months')}
          >
            3 meses
          </Button>
        </XStack>
        <XStack gap={10} padding={3}>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(6, 'months')}
          >
            6 meses
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(1, 'years')}
          >
            1 ano
          </Button>
        </XStack>
        <XStack gap={15} marginTop={30}>
          <YStack alignItems='center'>
            <Label fontSize='$4' color='#D9D9E3' htmlFor='initialDate'>
              Data Inicial:
            </Label>
            <XStack>
              <TextInput
                id='initialDate'
                editable={false}
                style={styles.dateInput}
                value={initialDate.toLocaleDateString()}
              />
              <TouchableOpacity style={styles.dateButton} children={<Calendar />} onPress={showDatePickerInitialDate} />
            </XStack>
          </YStack>
          <YStack alignItems='center'>
            <Label fontSize='$4' color='#D9D9E3' htmlFor='finalDate'>
              Data Final:
            </Label>
            <XStack>
              <TextInput
                id='finalDate'
                editable={false}
                style={styles.dateInput}
                value={finalDate.toLocaleDateString()}
              />
              <TouchableOpacity style={styles.dateButton} children={<Calendar />} onPress={showDatePickerFinalDate} />
            </XStack>
          </YStack>
        </XStack>
      </View>
      <XStack space='$3' justifyContent='center' marginTop={30}>
        <Button
          pressStyle={{
            opacity: 0.5,
            borderColor: '#565869',
            backgroundColor: '#565869',
          }}
          elevationAndroid={5}
          bc='#565869'
          color='$red10Dark'
          onPress={handleCancelButton}
        >
          Cancelar
        </Button>
        <Button
          pressStyle={{
            opacity: 0.5,
            borderColor: '#565869',
            backgroundColor: '#565869',
          }}
          elevationAndroid={5}
          bc='#565869'
          color='#19C37D'
          onPress={handleConfirmButton}
        >
          Confirmar
        </Button>
      </XStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    gap: 15,
  },
  dateInput: {
    backgroundColor: '#D9D9E3',
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 135,
    height: 40,
  },
  dateButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 45,
    backgroundColor: '#D9D9E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
