import { StyledText, StyledButton, StyledHover } from './commonButton.styles';
import { useCommonButton } from './commonButton.hooks';

const CommonButton = ({
  pathingInProgress,
  onClick,
  disabled,
  children,
  type = 'button',
}) => {
  const { renderLoading, handleClick } = useCommonButton(onClick);
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
