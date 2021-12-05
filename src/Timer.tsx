import { useCallback, useState } from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import {
  RepeatClockIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const getMinsSecs = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
};

export const Timer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playPause = useCallback(() => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  }, [isPlaying]);

  const [key, setKey] = useState(1);
  const reset = useCallback(() => {
    setKey((old) => old + 1);
    setIsPlaying(false);
  }, []);

  const [duartion, setDuration] = useState(2 * 60);
  const addSec = useCallback(() => {
    setDuration((old) => old + 1);
    reset();
  }, []);
  const removeSec = useCallback(() => {
    setDuration((old) => old - 1);
    reset();
  }, []);

  const renderTime = useCallback(
    ({ remainingTime }: { remainingTime: number }) => (
      <Text fontSize="6em">{getMinsSecs(remainingTime)}</Text>
    ),
    [],
  );

  return (
    <Box display="flex">
      <Box onClick={playPause}>
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={duartion}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
          size={350}
        >
          {renderTime}
        </CountdownCircleTimer>
      </Box>
      <Box ml={2} display="flex" flexDirection="column" justifyContent="center">
        <IconButton
          onClick={addSec}
          icon={<TriangleUpIcon />}
          aria-label="Increase Time"
          mb={1}
        />
        <IconButton
          onClick={removeSec}
          icon={<TriangleDownIcon />}
          aria-label="Decrease Time"
          mb={1}
        />
        <IconButton
          onClick={reset}
          icon={<RepeatClockIcon />}
          aria-label="Reset Time"
        />
      </Box>
    </Box>
  );
};
