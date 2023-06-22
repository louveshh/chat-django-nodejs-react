import { StyledLabel, StyledInput, StyledWrapper } from './commonBar.styles';

const CommonBar = ({
  id,
  label,
  aria,
  onChange,
  min = 0,
  max = 50,
  step = 1,
  defaultValue = 0,
}) => (
  <StyledWrapper>
    <StyledLabel htmlFor={id}>{`${label}`}</StyledLabel>
    <StyledInput
      id={id}
      aria={aria}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      type="range"
    />
  </StyledWrapper>
);

export default CommonBar;
