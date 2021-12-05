import { Box, StyleProps } from '@chakra-ui/react';

export type EllipseProps = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  label?: string;
  content: string | number;
  styles?: {
    root?: StyleProps;
    content?: StyleProps;
    label?: StyleProps;
  };
};

const getRatio = (size: EllipseProps['size']) => {
  switch (size) {
    case 'small':
      return 1.75;
    case 'medium':
      return 2.1;
    case 'large':
      return 2.8;
    default:
      return 1;
  }
};

export const Ellipse = ({
  size = 'medium',
  color = '#c2c2c2',
  label,
  content,
  styles,
}: EllipseProps) => {
  return (
    <Box
      mx={3}
      my={1}
      width="max-content"
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontSize={`${getRatio(size)}em`}
      fontWeight={size === 'large' ? 'bold' : undefined}
      {...styles?.root}
    >
      <Box
        px={7}
        py={2}
        backgroundColor={color}
        borderRadius={30}
        {...styles?.content}
      >
        {content}
      </Box>
      {label && (
        <Box mx="auto" {...styles?.label}>
          {label}
        </Box>
      )}
    </Box>
  );
};
