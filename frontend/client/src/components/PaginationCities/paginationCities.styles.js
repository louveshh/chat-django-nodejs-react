import styled from 'styled-components';

export const StyledTitle = styled.span`
  margin-top: 5px;
  color: ${(props) => props.theme.view.white};
`;

export const StyledWrapper = styled.div`
  min-width: 100%;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.city.background};
  @media (max-width: 1150px) {
    text-align: center;
  }
  color: ${(props) => props.theme.view.white};
`;

export const StyledInformation = styled.div`
  text-align: center;
  padding: 10px;
`;

export const StyledPaginationWrapper = styled.div`
  display: flex;
  justify-content: between;
  border-top: 1px solid ${(props) => props.theme.view.white};
  border-bottom: 1px solid ${(props) => props.theme.view.white};
`;
export const StyledPageInfo = styled.div`
  min-width: 80%;
  text-align: center;
  flex-grow: 1;
`;
export const StyledButton = styled.button`
  flex-grow: 0;
  width: 25px;
  background-color: transparent;
  border-top: 1px solid ${(props) => props.theme.view.white};
  border-bottom: 1px solid ${(props) => props.theme.view.white};
  border-left: 2px solid ${(props) => props.theme.view.white};
  border-right: 2px solid ${(props) => props.theme.view.white};
  outline: none;
  padding: 2px 1px 1px 1px;
  cursor: pointer;
`;
