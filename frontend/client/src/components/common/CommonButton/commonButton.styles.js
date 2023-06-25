import styled from 'styled-components';

export const StyledButton = styled.button`
  display: inline-block;
  position: relative;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  margin: 20px 0px;
  background: ${(props) => props.theme.button.background};
  overflow: hidden;
  width: 100%;

  @media (max-width: 1150px) {
    max-width: 150px;
  }

  ${(props) => {
    if (!props.disabled) {
      return `
      cursor: pointer;
      `;
    }
    return `
    cursor: not-allowed;
      `;
  }}

  &::before,
  &::after {
    content: '';
    width: 0;
    height: 2px;
    position: absolute;
    transition: all 0.8s ease-in-out;
    ${(props) => {
      if (!props.disabled) {
        return `
        background: ${props.theme.button.enabled};
        `;
      }
      return `
      background: transparent;
        `;
    }}
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
  }

  &:hover::before {
    right: 0%;
    left: unset;
    top: 0%;
  }

  &::before {
    left: 0%;
    top: 0%;
  }

  &:hover::after {
    left: 0%;
    bottom: 0%;
  }
  &::after {
    right: 0%;
    bottom: 0%;
  }
`;

export const StyledHover = styled.span`
  display: block;
  padding: 25px;

  &::before,
  &::after {
    content: '';
    width: 2px;
    height: 0;
    position: absolute;
    transition: all 0.8s ease-in-out;
    ${(props) => {
      if (!props.disabled) {
        return `
        background: ${props.theme.button.enabled};
        `;
      }
      return `
        background: transparent;
        `;
    }}
  }

  ${StyledButton}:hover &::before ,
      ${StyledButton}:hover &::after {
    height: 100%;
  }

  ${StyledButton}:hover &::before {
    left: 0;
    top: 0;
  }

  ${StyledButton} &::before {
    left: 0;
    bottom: 0;
  }

  ${StyledButton}:hover &::after {
    right: 0;
    bottom: 0;
    top: unset;
  }
  ${StyledButton} &::after {
    right: 0;
    top: 0;
  }
`;

export const StyledText = styled.div``;

export const StyledLoading = styled.span`
  position: absolute;
  &:nth-child(1) {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 2px;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      from(${(props) => props.theme.button.loading}),
      to(${(props) => props.theme.button.loading2})
    );
    background: linear-gradient(
      to right,
      ${(props) => props.theme.button.loading},
      ${(props) => props.theme.button.loading2}
    );
    animation: 2s animateTop linear infinite;
  }

  @keyframes animateTop {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  &:nth-child(2) {
    top: 0px;
    right: 0px;
    height: 100%;
    width: 2px;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      from(${(props) => props.theme.button.loading}),
      to(${(props) => props.theme.button.loading2})
    );
    background: linear-gradient(
      to right,
      ${(props) => props.theme.button.loading},
      ${(props) => props.theme.button.loading2}
    );    );
    animation: 2s animateRight linear -1s infinite;
  }

  @keyframes animateRight {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  &:nth-child(3) {
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 2px;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      from(${(props) => props.theme.button.loading}),
      to(${(props) => props.theme.button.loading2})
    );
    background: linear-gradient(
      to right,
      ${(props) => props.theme.button.loading},
      ${(props) => props.theme.button.loading2}
    );
    -webkit-animation: 2s animateBottom linear infinite;
    animation: 2s animateBottom linear infinite;
  }

  @keyframes animateBottom {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  &:nth-child(4) {
    top: 0px;
    left: 0px;
    height: 100%;
    width: 2px;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      from(${(props) => props.theme.button.loading}),
      to(${(props) => props.theme.button.loading2})
    );
    background: linear-gradient(
      to right,
      ${(props) => props.theme.button.loading},
      ${(props) => props.theme.button.loading2}
    );
    animation: 2s animateLeft linear -1s infinite;
  }

  @keyframes animateLeft {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;
