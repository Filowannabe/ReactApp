import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment-timezone';
import { useState } from 'react';
import { useUpdateProductQuantity } from './hooks/useUpdateProductQuantity';
import { Product } from './types/Product';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
};

function UpdateProductQuantityModal({ isOpen, onClose, product, setSelectedProduct }: Props) {
  const toast = useToast();
  const [currentProductQuantity, setCurrentProductQuantity] = useState<number>();
  const handleCloseClick = () => {
    onClose();
  };

  const { mutateUpdateProductQuantityAsync } = useUpdateProductQuantity();

  const handleUpdateClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (currentProductQuantity) {
      if (currentProductQuantity > 1000) {
        toast({
          title: 'Error',
          description: 'Quantity can not be bigger than 1000',
          status: 'error',
        });
      } else {
        console.log(1000);
        mutateUpdateProductQuantityAsync(
          { quantity: currentProductQuantity, id: product.id },
          {
            onSuccess: (data) => {
              console.log('data ', data);
              onClose();
              product.inventoryQuantity = data.inventoryQuantity
              product.inventoryUpdatedTime = data.inventoryUpdatedTime
              setSelectedProduct(product);

              console.log('new ', product);
            },
          },
        );
      }
    }
  };

  const modalObject = {
    title: 'Update Product Quantity.',
    body: (
      <VStack alignItems={'start'}>
        <HStack>
          <Text sx={{ fontWeight: 'bold' }}>Name:</Text>
          <Text>{product.name}</Text>
        </HStack>
        <HStack>
          <Text sx={{ fontWeight: 'bold' }}>SKU:</Text>
          <Text>{product.sku}</Text>
        </HStack>

        <HStack>
          <Text sx={{ fontWeight: 'bold' }}>Last Updated:</Text>
          <Text>{moment(product.inventoryUpdatedTime).format('MMM. D, YYYY [at] h:mm A z')}</Text>
        </HStack>

        <HStack>
          <Text sx={{ fontWeight: 'bold' }}>Quantity:</Text>
          <Input
            onChange={(e) => {
              setCurrentProductQuantity(Number(e.target.value));
            }}
            type="number"
            max="1000"
            defaultValue={product.inventoryQuantity}
          />
        </HStack>
      </VStack>
    ),
  };
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleCloseClick}>
        <ModalOverlay />
        <ModalContent sx={{ padding: '10px 20px', marginTop: '200px' }}>
          <ModalHeader>{modalObject.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{modalObject.body}</ModalBody>

          <ModalFooter>
            <>
              <HStack w="full" justify={'center'}>
                <Button
                  sx={{
                    borderRadius: '4px',
                    color: '#0a4409',
                    width: '50%',
                    ['&:hover']: {
                      backgroundColor: 'neutral.grey',
                    },
                  }}
                  onClick={handleCloseClick}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    handleUpdateClick(e);
                  }}
                  sx={{
                    borderRadius: '4px',
                    color: '#fff',
                    backgroundColor: '#0a4409',
                    width: '50%',
                    ['&:hover']: {
                      backgroundColor: 'neutral.grey',
                    },
                  }}
                  ml={3}
                >
                  Update
                </Button>
              </HStack>
            </>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateProductQuantityModal;
