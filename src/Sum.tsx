import {
  Editable,
  EditableInput,
  EditablePreview,
  Box,
  Text,
} from '@chakra-ui/react';

export const Sum = () => {
  return (
    <Box display="flex" alignItems="center">
      <Text fontSize="3xl" mr={2}>
        ВСЕГО:
      </Text>
      <Editable
        textAlign="center"
        defaultValue="0"
        fontSize="5xl"
        fontWeight="bold"
        pr={2}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Box>
  );
};
