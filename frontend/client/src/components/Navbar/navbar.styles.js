import styled from 'styled-components';

export const WrapperNavbar = styled.nav`
  width: 100%;
  background-color: transparent;
  height: 50px;
  filter: drop-shadow(3px 3px 10px #121212);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TrapezoidNavbar = styled.div`
  background-color: transparent;
  height: 100%;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0% 100%, 100% 100%, 100% 0, 0 0);
  width: 60%;
  background-color: transparent;
  filter: drop-shadow(2px 2px 5px #212121);
`;

export const Triangle = styled.div`
  position: absolute;
  height: 50px;
  width: 50%;
  height: 100%;
  text-align: center;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(1) {
    left: 0;
    clip-path: polygon(100% 0, 0 0, 50% 100%);
    background-color: ${(props) => props.theme.color.primary};
  }

  &:nth-child(2) {
    left: 25%;
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
    background-color: ${(props) => props.theme.color.secondary};
  }

  &:nth-child(3) {
    left: 50%;
    clip-path: polygon(100% 0, 0 0, 50% 100%);
    background-color: ${(props) => props.theme.color.primary};
  }

  &:hover {
    background-color: ${(props) => props.theme.color.secondary2};
  }
`;
