import { RepeatClockIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Ellipse } from './Ellipse';

const initial = [1, 2, 4, 7, 10, 15, 20, 25, 30, 50];

const initPoints = (pointsArray: number[]) =>
  pointsArray.map((point, index) => {
    if (index === 0) {
      return {
        value: point,
        isTaken: false,
        isActive: true,
      };
    }
    return {
      value: point,
      isTaken: false,
      isActive: false,
    };
  });

export const Game = () => {
  const [points, setPoints] = useState(initPoints(initial));
  const resetPoints = useCallback(() => setPoints(initPoints(initial)), []);

  const [score, setScore] = useState(0);
  const addScore = useCallback(() => {
    if (score < points.length) {
      setScore((old) => old + 1);
    }
  }, [score]);
  const dropScore = useCallback(() => {
    setScore(0);
    resetPoints();
  }, []);

  const [bank, setBank] = useState(0);
  const dropToBank = useCallback(() => {
    if (score === 0) {
      return;
    }
    setBank((old) => old + points[score - 1].value);
    dropScore();
    resetPoints();
  }, [score, points]);

  const reset = useCallback(() => {
    dropScore();
    setBank(0);
  }, []);

  useEffect(
    () =>
      setPoints((points) => {
        const newPoints = points.map((point, index) => {
          if (index + 1 <= score) {
            return { ...point, isTaken: true, isActive: false };
          }
          return { ...point, isTaken: false };
        });
        if (score < points.length) {
          newPoints[score].isActive = true;
        }
        return newPoints;
      }),
    [score],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
          addScore();
          break;
        case 'ArrowDown':
          dropScore();
          break;
        case 'Space':
          dropToBank();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dropToBank, addScore]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        {points
          .slice()
          .reverse()
          .map(({ value, isActive, isTaken }, index) => {
            if (index === 0)
              return (
                <Ellipse
                  key={value}
                  size="large"
                  content={value}
                  color={isTaken ? '#c43404' : '#035082'}
                  styles={{
                    root: { color: '#fff' },
                    content: {
                      width: 150,
                      textAlign: 'center',
                      ml: isActive ? 5 : undefined,
                    },
                  }}
                />
              );
            return (
              <Ellipse
                key={value}
                content={value}
                color={isTaken ? '#c43404' : '#035082'}
                styles={{
                  root: { color: '#fff' },
                  content: {
                    width: 150,
                    textAlign: 'center',
                    ml: isActive ? 5 : undefined,
                  },
                }}
              />
            );
          })}
      </Box>
      <Box display="flex" alignItems="flex-start">
        <Ellipse size="large" content={bank} label="БАНК" />
        <IconButton
          onClick={reset}
          icon={<RepeatClockIcon />}
          aria-label="Reset Time"
        />
      </Box>
    </Box>
  );
};
