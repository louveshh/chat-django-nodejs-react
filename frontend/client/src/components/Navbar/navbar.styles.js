import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { configDisplay } from 'config/config';

export const WrapperNavbar = styled.nav`
  width: 100%;
  background-color: transparent;
  height: 50px;
  filter: drop-shadow(3px 3px 10px #121212);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 650px) {
    background-color: ${(props) => props.theme.view.secondary};
  }
  margin-bottom: 20px;
`;

export const TrapezoidNavbar = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    transform: scale(${configDisplay.SCALE});
    width: 200px;
  }
  @media (min-width: 650px) {
    width: 60%;
    background-color: transparent;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: transparent;
    filter: drop-shadow(2px 2px 5px #212121);
  }
`;

export const StyledButton = styled.div`
  cursor: pointer;
  text-decoration: underline;
  display: flex;
  padding: 0px 20px 0px 20px;
  height: 100%;
  text-align: center;
  align-items: center;
  border: 1px solid black;

  background-color: ${(props) => props.theme.view.primary};

  @media (min-width: 650px) {
    height: 50px;
    width: 50%;
    height: 100%;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: unset;

    left: 50%;
    clip-path: polygon(100% 0, 0 0, 50% 100%);

    &:hover {
      background-color: ${(props) => props.theme.view.secondary2};
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  padding: 0px 20px 0px 20px;
  height: 100%;
  text-align: center;
  align-items: center;
  border: 1px solid black;

  ${(props) => {
    if (props.isActive) {
      return `
      cursor: not-allowed;
      color: ${props.theme.view.white};
      background-color:  ${props.theme.view.secondary2};
      text-decoration: underline;
  `;
    }
    return `
      cursor: pointer;
      color: ${props.theme.view.black};
      background-color:  ${props.theme.view.primary};
      text-decoration: none;
    `;
  }}
  @media (min-width: 650px) {
    height: 50px;
    width: 50%;
    height: 100%;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: unset;
    &:nth-child(1) {
      left: 0;
      clip-path: polygon(100% 0, 0 0, 50% 100%);
    }

    &:nth-child(2) {
      left: 25%;
      clip-path: polygon(50% 0, 0 100%, 100% 100%);
    }

    &:nth-child(3) {
      left: 50%;
      clip-path: polygon(100% 0, 0 0, 50% 100%);
    }

    &:hover {
      background-color: ${(props) => props.theme.view.secondary2};
    }
  }
`;
