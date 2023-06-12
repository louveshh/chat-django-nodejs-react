import styled from 'styled-components';

// Define the motion values for the button animation

const StyledContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100vh;
`;
const StyledButton = styled.button`
  display: inline-block;
  position: relative;
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  margin: 20px 30px;
  background: rgba(0, 0, 0, 0.09);

  &::before,
  &::after {
    content: '';
    width: 0;
    height: 2px;
    position: absolute;
    background: #ff00ff;
    transition: all 0.8s linear;
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

const StyledSpan = styled.span`
  display: block;
  padding: 25px 80px;

  &::before,
  &::after {
    content: '';
    width: 2px;
    height: 0;
    position: absolute;
    transition: all 0.8s linear;
    background: #fff;
  }

  ${StyledButton}:hover &::before ,
  ${StyledButton}:hover &::after {
    height: 100%;
  }

  ${StyledButton}:hover &::before {
    left: 0;
    top: 0;
    height: 100%;
  }

  ${StyledButton} &::before {
    left: 0;
    bottom: 0;
  }

  ${StyledButton}:hover &::after {
    height: 100%;
    right: 0;
    bottom: 0;
    top: unset;
  }
  ${StyledButton} &::after {
    right: 0;
    top: 0;
  }
`;

const ButtonStyled = () => {
  return (
    <StyledContainer>
      <StyledButton className="btn-1">
        <StyledSpan></StyledSpan>
      </StyledButton>
    </StyledContainer>
  );
};

export default ButtonStyled;
