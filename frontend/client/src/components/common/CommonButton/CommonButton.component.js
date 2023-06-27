import { StyledText, StyledButton, StyledHover } from './commonButton.styles';
import { useCommonButton } from './commonButton.hooks';

const CommonButton = ({
  pathingInProgress,
  onClick,
  disabled,
  children,
  aria,
  type = 'button',
}) => {
  const { renderLoading, handleClick } = useCommonButton(onClick, disabled);
  return (
    <StyledButton
      onClick={handleClick}
      type={type}
      aria-label={aria}
      disabledAnimations={disabled}
    >
      <StyledHover disabled={disabled}>
        {pathingInProgress && renderLoading()}
        <StyledText>{children}</StyledText>
      </StyledHover>
    </StyledButton>
  );
};

export default CommonButton;
