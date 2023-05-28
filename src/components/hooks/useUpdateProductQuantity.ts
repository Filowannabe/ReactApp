/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import api, { UPDATE_PRODUCT_QUANTITY } from '../../api';

export const useUpdateProductQuantity = () => {
  const toast = useToast();
  const { isLoading, mutateAsync, data } = useMutation({
    mutationFn: async (payload: { quantity: number; id: string }) => {
      const { data } = await api.patch(
        `${UPDATE_PRODUCT_QUANTITY.replace(':productId', payload.id)}?inventoryQuantity=${payload.quantity}`,
      );
      return data;
    },

    onError: (data) => {
      if (data) {
        toast({
          title: 'Error',
          description: 'Error occurred.',
          status: 'error',
        });
      }
    },
  });

  return {
    isLoadingUpdateProductQuantity: isLoading,
    updateProductQuantity: data,
    mutateUpdateProductQuantityAsync: mutateAsync,
  };
};
