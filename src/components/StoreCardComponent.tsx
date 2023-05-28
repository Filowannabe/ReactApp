import { Avatar, HStack, Text } from '@chakra-ui/react';
import { Store } from './types/Store';

type Props = {
  store: Store;
};

const StoreCardComponent = ({ store }: Props) => {
  return (
    <HStack w="full" alignItems="center" justify="start" textAlign="start" mt="0 !important">
      <Avatar
        bg="#D9D9D9"
        sx={{
          width: '37px',
          height: '37px',
          cursor: 'pointer',
        }}
      />
      <Text fontSize="15px" sx={{ fontWeight: 'bold' }} aria-label="patient-name">
        {store.name}
      </Text>
    </HStack>
  );
};

export default StoreCardComponent;
