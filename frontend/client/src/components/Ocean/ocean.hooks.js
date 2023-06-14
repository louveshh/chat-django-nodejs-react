import { useTheme } from 'styled-components';

export const useOcean = () => {
  const theme = useTheme();
  const { color } = theme.ocean;
  return { color };
};
