import styled from 'styled-components';

export const StyledTitle = styled.span`
  margin-top: 50px;
  color: ${(props) => props.theme.view.white};
`;

export const StyledWrapper = styled.div`
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
