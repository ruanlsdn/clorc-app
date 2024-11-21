import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { HistoryList, Searchbar } from '../../components';
import { iCard, iHistoryOrder } from '../../interfaces';
import { axiosCardService } from '../../services';
import { useAxios } from '../../hooks';
import { useDataControlContext } from '../../contexts';
import { userId } from '../../../userId';

export default function HistoryScreen() {
  const { refreshHistory } = useDataControlContext();
  const { data, fetchData } = useAxios<iCard[], iCard[]>();

  useEffect(() => {
    fetchData({
      axiosInstance: axiosCardService,
      method: 'get',
      url: `user/${userId}`,
    });
  }, [refreshHistory]);

  return (
    <>
      <Searchbar />
      <HistoryList list={data!} />
    </>
  );
}
