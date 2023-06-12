import styled from 'styled-components';
import Select, { components } from 'react-select';

export const CustomSelect = styled(Select)`
  height: 30px;
  margin-bottom: 20px;
  @media (max-width: 1100px) {
    width: 80% !important;
  }
  @media (max-width: 1100px) {
    width: 70% !important;
  }
`;

export const CustomMenuList = styled(components.MenuList)`
  max-height: 300px !important;
  @media (max-width: 1100px) {
    max-height: 140px !important;
  }
  @media (max-width: 700px) {
    max-height: 100% !important;
  }
  overflow-y: auto;
`;

export const CustomPlaceholder = styled(components.Placeholder)`
  text-align: center;
`;

export const CustomValueContainer = styled(components.ValueContainer)`
  display: flex;
  justify-content: center;
  margin-left: 2.5rem;
`;

export const CustomOption = styled(components.Option)`
  text-align: center;
`;
export const CustomLabel = styled.label``;
