import { StyledText, StyledButton, StyledHover } from './commonButton.styles';
import { useCommonButton } from './commonButton.hooks';

const CommonButton = ({
  inProgress,
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
        {inProgress && renderLoading()}
        <StyledText>{children}</StyledText>
      </StyledHover>
    </StyledButton>
  );
};

export default CommonButton;
