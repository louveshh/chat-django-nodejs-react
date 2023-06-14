import { StyledText, StyledButton, StyledHover } from './commonButton.styles';
import { renderLoading } from './commonButton.utils';

const CommonButton = ({ pathingInProgress, onClick, disabled, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <StyledButton onClick={handleClick} disabled={disabled}>
      <StyledHover disabled={disabled}>
        {pathingInProgress && renderLoading()}
        <StyledText>{children}</StyledText>
      </StyledHover>
    </StyledButton>
  );
};

export default CommonButton;
