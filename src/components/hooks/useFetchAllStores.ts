/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import api, { GET_ALL_STORES } from '../../api';
import { Store } from '../types/Store';

export const useFetchAllStores = () => {
  const toast = useToast();
  const { isLoading, mutateAsync, data } = useMutation({
    mutationFn: async (search: string) => {
      if (search) {
        const { data } = await api.get<Array<Store>>(GET_ALL_STORES, {
          params: { search: search },
        });
        return data;
      }
      const { data } = await api.get<Array<Store>>(GET_ALL_STORES);
      return data;
    },

    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later.',
        status: 'error',
      });
    },
  });

  useEffect(() => {
    mutateAsync('');
  }, []);

  return {
    isLoadingFetchedStores: isLoading,
    fetchedStores: data || [],
    fetchedStoresMutateAsync: mutateAsync,
  };
};
