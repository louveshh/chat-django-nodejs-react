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
  const { renderLoading, handleClick } = useCommonButton(onClick);
  return (
    <StyledButton
      onClick={handleClick}
      disabled={disabled}
      type={type}
      aria-label={aria}
    >
      <StyledHover disabled={disabled}>
        {inProgress && renderLoading()}
        <StyledText>{children}</StyledText>
      </StyledHover>
    </StyledButton>
  );
};

export default CommonButton;
