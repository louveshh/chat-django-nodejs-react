import { StyledText, StyledButton, StyledHover } from './commonButton.styles';
import { renderLoading } from './commonButton.utils';

const CommonButton = ({ pathingInProgress, onClick, disabled, children, type = 'button' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <StyledButton onClick={handleClick} disabled={disabled} type={type}>
      <StyledHover disabled={disabled}>
        {pathingInProgress && renderLoading()}
        <StyledText>{children}</StyledText>
      </StyledHover>
    </StyledButton>
  );
};

export default CommonButton;
