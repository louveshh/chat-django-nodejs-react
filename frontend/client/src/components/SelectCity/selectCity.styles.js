import styled from 'styled-components';
import Select, { components } from 'react-select';

export const StyledSelect = styled(Select)`
  height: 30px;
`;

export const StyledMenuList = styled(components.MenuList)`
  max-height: 300px !important;
  @media (max-width: 1100px) {
    max-height: 140px !important;
  }
  overflow-y: auto;
`;
