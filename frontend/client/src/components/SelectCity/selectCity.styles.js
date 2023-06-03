import styled from 'styled-components';
import { components } from 'react-select';

export const StyledMenuList = styled(components.MenuList)`
  max-height: 300px !important;
  @media (max-width: 1100px) {
    max-height: 140px !important;
  }
  overflow-y: auto;
`;
