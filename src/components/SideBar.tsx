/* eslint-disable react-hooks/exhaustive-deps */
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import StoreCardComponent from './StoreCardComponent';
import { Store } from './types/Store';

const SearchSchema = z.object({
  search: z.string().optional(),
});

type Props = {
  setSelectedStore: React.Dispatch<React.SetStateAction<Store | undefined>>;
  fetchedStoresMutateAsync: UseMutateAsyncFunction<Store[], unknown, void, unknown>;
  fetchedStores: Store[];
  isLoadingFetchedStores: boolean;
};
type SearchSchema = z.infer<typeof SearchSchema>;

export default function SideBar({
  setSelectedStore,
  fetchedStores,
  fetchedStoresMutateAsync,
  isLoadingFetchedStores,
}: Props) {
  const {
    register,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<SearchSchema>({
    mode: 'all',
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: '',
    },
  });
  useEffect(() => {
    setValue('search', '');
  }, []);

  const handleOnClick = (store: Store) => {
    setSelectedStore(store);
  };

  const handleSearchDebounced = useCallback(debounce(fetchedStoresMutateAsync, 400), []);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0 || searchValue.length >= 3) {
      clearErrors('search');
      handleSearchDebounced();
    } else if (searchValue.length < 3) {
      setError('search', {
        type: 'min',
        message: 'At least 3 characters must be provided to perform the search.',
      });
    }
  };

  return (
    <Box w="238px" minW="238px">
      <Box
        bgColor="#FFFFFF"
        w="232px"
        sx={{
          position: 'fixed',
          top: '58px',
          height: 'calc(100% - 142px)',
        }}
      >
        <Box p={3} borderBottom="1px solid #DFE1E5">
          <HStack>
            <Text
              sx={{
                fontSize: '28px',
                color: '#388f46',
                fontWeight: 700,
              }}
              role="heading"
            >
              Stores
            </Text>
          </HStack>
        </Box>
        <Box
          sx={{
            maxHeight: 'calc(100% - 50px)',
            overflowY: 'auto',
            '::-webkit-scrollbar': {
              width: '7.5px',
            },
            '::-webkit-scrollbar-track': {
              background: 'rgba(229, 229, 229, 0.9) !important',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#BEBEBE!important',
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: '#adadad !important',
            },
          }}
          data-testid="schedule-staff-sidebar-content"
        >
          <VStack p={3} pb={2}>
            <FormControl isInvalid={!!errors.search}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  {isLoadingFetchedStores ? (
                    <CircularProgress isIndeterminate color="primary.dark" size="16px" />
                  ) : (
                    <SearchIcon />
                  )}
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search..."
                  sx={{
                    fontSize: '13px',
                  }}
                  autoComplete="off"
                  aria-label="Search clients"
                  {...register('search')}
                  onChange={handleOnSearch}
                />
              </InputGroup>
              <FormErrorMessage color="red.500" fontSize="13px">
                {errors.search?.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>
          <VStack alignItems={isLoadingFetchedStores ? 'center' : 'flex-start'} gap={0}>
            {isLoadingFetchedStores ? (
              <CircularProgress
                isIndeterminate
                color="primary.dark"
                size="25px"
                sx={{
                  marginTop: '20px',
                }}
              />
            ) : fetchedStores?.length === 0 ? (
              <Text fontSize="13px" px={3} py={1}>
                They were not found stores.
              </Text>
            ) : (
              <Card>
                {fetchedStores.map((store: Store) => {
                  return (
                    <Box
                      w="full"
                      key={store.id}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'green.600',
                        },
                      }}
                    >
                      <CardBody px={0} py={2} onClick={() => handleOnClick(store)}>
                        <Box>
                          <StoreCardComponent store={store} />
                        </Box>

                        {isLoadingFetchedStores ? (
                          <Box py={3} w="full" textAlign="center">
                            <CircularProgress isIndeterminate size="20px" color="primary.dark" trackColor="#d3d3db" />
                          </Box>
                        ) : (
                          <></>
                        )}
                      </CardBody>
                    </Box>
                  );
                })}
              </Card>
            )}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
