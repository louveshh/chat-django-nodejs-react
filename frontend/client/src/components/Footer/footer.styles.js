import styled from 'styled-components';

export const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 50.5%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.view.white};
`;
