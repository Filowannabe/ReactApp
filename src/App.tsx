import { CircularProgress, HStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import UpdateProductQuantityModal from './components/ProductsModal';
import ProductsTable from './components/ProductsTable';
import SideBar from './components/SideBar';
import { useFetchAllStores } from './components/hooks/useFetchAllStores';
import { Product } from './components/types/Product';
import { Store } from './components/types/Store';

const App = () => {
  const [selectedStore, setSelectedStore] = useState<Store>();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchedStores, fetchedStoresMutateAsync, isLoadingFetchedStores } = useFetchAllStores();

  return (
    <HStack w="full">
      {isLoadingFetchedStores ? (
        <CircularProgress isIndeterminate color="primary.dark" size="16px" />
      ) : (
        <SideBar
          setSelectedStore={setSelectedStore}
          fetchedStores={fetchedStores}
          fetchedStoresMutateAsync={fetchedStoresMutateAsync}
          isLoadingFetchedStores={isLoadingFetchedStores}
        />
      )}
      <ProductsTable selectedStore={selectedStore} setSelectedProduct={setSelectedProduct} onOpen={onOpen} />
      {selectedProduct && (
        <UpdateProductQuantityModal
          isOpen={isOpen}
          onClose={onClose}
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </HStack>
  );
};

export default App;
