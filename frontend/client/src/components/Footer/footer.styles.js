import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.view.white};
  @media (max-width: 700px) {
    font-size: 7px;
  }
  @media (min-width: 1150px) {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 700px) {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
