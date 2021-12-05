import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from './Layout';

export const App = () => (
  <ChakraProvider resetCSS>
    <Layout />
  </ChakraProvider>
);
