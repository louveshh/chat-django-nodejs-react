import styled from 'styled-components';

export const StyledUl = styled.ul`
  display: flex;
  flex-flow: column;
  justify-content: space-between; /* or other values like 'flex-start', 'flex-end', 'space-around', etc. */
  padding: 0;
  height: 100%;
  flex-grow: 1;
  margin: 10px 0px 10px 10px;
`;
export const StyledLi = styled.li`
  color: ${(props) => props.theme.view.white};
  font-size: 13px;
  @media (max-width: 1150px) {
    &:first-child {
      margin-top: 5px;
    }
    margin-bottom: 5px;
  }
`;
