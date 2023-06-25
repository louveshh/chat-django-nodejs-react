import styled from 'styled-components';

export const StyledDisplayWrapper = styled.div`
  min-width: 100%;
  background-color: ${(props) => props.theme.city.background};
  @media (max-width: 1150px) {
    text-align: center;
  }
`;

export const StyledDisplayUl = styled.ul`
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  color: ${(props) => props.theme.view.white};
  @media (max-width: 1150px) {
    width: unset;
    display: inline-block;
    text-align: left;
  }
`;

export const StyledInformation = styled.li`
  margin-left: 10px;
`;

export const StyledTitle = styled.span`
  color: ${(props) => props.theme.view.white};
`;

export const StyledSubTitle = styled.span`
  color: ${(props) => props.theme.view.white};
`;

export const StyledDescription = styled.span`
  color: ${(props) => props.theme.view.white};
`;
