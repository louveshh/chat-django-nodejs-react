import { StyledText, StyledButton, StyledHover } from './commonButton.styles';
import { renderLoading } from './commonButton.utils';

const CommonButton = ({ pathingInProgress, onClick, disabled }) => {
  console.log(disabled);
  const handleClick = () => {
    console.log('xd?');
    if (onClick) {
      onClick();
    }
  };
  return (
    <StyledButton onClick={handleClick} disabled={disabled}>
      <StyledHover disabled={disabled}>
        {pathingInProgress && renderLoading()}
        <StyledText>Butto12n</StyledText>
      </StyledHover>
    </StyledButton>
  );
};

export default CommonButton;
