import { Box, Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { Product } from './types/Product';
import { Store } from './types/Store';

type Props = {
  selectedStore: Store | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  onOpen: () => void;
};

function ProductsTable({ selectedStore, setSelectedProduct, onOpen }: Props) {
  const handleCLick = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <>
      <VStack w="full">
        <Box
          w="full"
          h="40"
          mt="20"
          textAlign={'right'}
          sx={{ backgroundColor: '#c6f6d5', borderRadius: '4px', color: '#0a4409', fontWeight: 'bold' }}
        >
          <Text mt="50" mr="20" fontSize={'40px'}>
            Product's Table
          </Text>
        </Box>
        <TableContainer w="full">
          <Table variant="striped" colorScheme="green">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>SKU</Th>
                <Th isNumeric>inventory Quantity</Th>
                <Th>inventory Updated Time</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedStore &&
                selectedStore.products?.map((it: Product) => {
                  return (
                    <Tr key={it.id}>
                      <Td sx={{ fontWeight: 'bold' }}>{it.name}</Td>
                      <Td sx={{ fontWeight: 'bold' }}>{it.sku}</Td>
                      <Td sx={{ fontWeight: 'bold' }} isNumeric>
                        {it.inventoryQuantity}
                      </Td>
                      <Td sx={{ fontWeight: 'bold' }}>
                        {it.inventoryUpdatedTime
                          ? moment(it.inventoryUpdatedTime).format('MMM. D, YYYY [at] h:mm A z')
                          : 'Not updated time.'}
                      </Td>
                      <Td sx={{ fontWeight: 'bold' }}>
                        <Button
                          sx={{ backgroundColor: '#fd8c00' }}
                          onClick={() => {
                            handleCLick(it);
                          }}
                        >
                          Edit
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
}
export default ProductsTable;
