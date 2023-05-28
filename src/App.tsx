import { HStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import UpdateProductQuantityModal from './components/ProductsModal';
import ProductsTable from './components/ProductsTable';
import SideBar from './components/SideBar';
import { Product } from './components/types/Product';
import { Store } from './components/types/Store';

const App = () => {
  const [selectedStore, setSelectedStore] = useState<Store>();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack w="full">
      <SideBar setSelectedStore={setSelectedStore} />
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
