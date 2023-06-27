import styled from 'styled-components';

export const StyledInput = styled.input`
  border-radius: 7px;
  padding: 5px;
`;

export const StyledLabel = styled.label`
  margin-bottom: 3px;
  color: ${(props) => props.theme.view.white};
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
`;
