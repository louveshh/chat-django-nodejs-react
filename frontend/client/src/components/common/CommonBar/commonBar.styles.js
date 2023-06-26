import styled from 'styled-components';

export const StyledInput = styled.input`
  cursor: pointer;
  color: ${(props) => props.theme.view.white};
`;

export const StyledLabel = styled.label`
  margin-bottom: 4px;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.view.white};
`;
