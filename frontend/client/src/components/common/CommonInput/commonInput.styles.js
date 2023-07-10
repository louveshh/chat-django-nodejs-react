import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 7px;
  border-radius: 6px;
  font-size: 16px;
  background: #fbfbfb;
  border: 2px solid transparent;
  border-radius: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 5px;
  &:focus,
  &::placeholder {
    border: 2px solid ${(props) => props.theme.view.primary2};
  }
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
