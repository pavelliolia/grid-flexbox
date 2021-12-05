import { Box } from '@chakra-ui/react';
import { Game } from './Game';
import { Sum } from './Sum';
import { Timer } from './Timer';

const gridTemplateAreas = `
"stairs . sum"
"stairs time time"
`;

export const Layout = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="grid"
      gridTemplateAreas={gridTemplateAreas}
      gridTemplateColumns="max-content 1fr max-content"
      gridTemplateRows="max-content 1fr max-content"
    >
      <Box gridArea="stairs" display="grid" justifyItems="center">
        <Game />
      </Box>
      <Box gridArea="sum" display="grid" justifyItems="end">
        <Sum />
      </Box>
      <Box gridArea="time" display="grid" placeItems="center">
        <Timer />
      </Box>
    </Box>
  );
};
