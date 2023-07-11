import styled from 'styled-components';

export const StyledTitle = styled.span`
  margin-top: 5px;
  color: ${(props) => props.theme.view.white};
`;

export const StyledWrapper = styled.div`
  min-width: 100%;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.city.background};
  @media (max-width: 1150px) {
    text-align: center;
  }
  color: ${(props) => props.theme.view.white};
  font-size: 12px;
`;

export const StyledInformation = styled.div`
  text-align: center;
  padding: 5px;
  color: ${(props) => props.theme.view.black};
  background-color: ${(props) =>
    props.color ? `rgb(${props.color.join(', ')})` : 'transparent'};
`;

export const StyledPaginationWrapper = styled.div`
  display: flex;
  justify-content: between;
  border-top: 1px solid ${(props) => props.theme.view.white};
  border-bottom: 1px solid ${(props) => props.theme.view.white};
`;
export const StyledPageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
