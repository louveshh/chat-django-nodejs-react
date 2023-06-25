import styled from 'styled-components';
import Select, { components } from 'react-select';

export const StyledSelect = styled(Select)`
  height: 30px;
  margin-bottom: 20px;
  @media (max-width: 1150px) {
    width: 80% !important;
  }
  @media (max-width: 1150px) {
    width: 70% !important;
  }
`;

export const StyledMenuList = styled(components.MenuList)`s
  max-height: 300px !important;
  @media (max-width: 1150px) {
    max-height: 140px !important;
  }
  @media (max-width: 700px) {
    max-height: 100% !important;
  }
  overflow-y: auto;
`;

export const StyledPlaceholder = styled(components.Placeholder)`
  text-align: center;
`;

export const StyledValueContainer = styled(components.ValueContainer)`
  display: flex;
  justify-content: center;
`;

export const StyledOption = styled(components.Option)`
  text-align: center;
`;
export const StyledLabel = styled.label`
  color: ${(props) => props.theme.view.white};
  text-align: center;
  margin-bottom: 5px;
`;
