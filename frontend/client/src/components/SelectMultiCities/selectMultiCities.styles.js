import styled from 'styled-components';
import Select, { components } from 'react-select';

export const CustomMultiSelect = styled(Select)`
  height: 30px;
  @media (max-width: 1150px) {
    width: 100% !important;
  }
  margin: 20px 0px 20px 0px;
`;

export const CustomMenu = styled(components.Menu)`
  position: relative !important;
  top: 0% !important;
`;

export const CustomMenuList = styled(components.MenuList)`
  position: relative;
  top: 0%;
  max-height: 300px !important;
  @media (max-width: 1150px) {
    max-height: 140px !important;
  }
  @media (max-width: 700px) {
    max-height: 100% !important;
  }
`;

export const CustomPlaceholder = styled(components.Placeholder)`
  text-align: center;
`;

export const CustomMultiValueStyle = styled(components.MultiValue)`
  display: flex;
  justify-content: center;
`;

export const SortableMultiValueDiv = styled.div`
  width: 90%;
  position: relative;
  text-align: center;
  transform: ${({ transform }) =>
    transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : ''};
  transition: ${({ transition }) => transition};
  &:first-child {
    background-color: ${(props) => props.theme.map.highlightedCity};
  }
`;
