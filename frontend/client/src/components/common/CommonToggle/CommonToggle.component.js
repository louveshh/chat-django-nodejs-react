import { StyledToggle, StyledLabel, StyledWrapper } from './commonToggle.styles';

const CommonToggle = ({
  checked,
  onChange,
  labelledby,
  aria,
  label,
  icons,
  id = aria || label,
}) => (
  <StyledWrapper>
    {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
    <StyledToggle
      id={id}
      checked={checked}
      onChange={onChange}
      aria-labelledby={labelledby}
      aria-label={aria}
      icons={icons}
    />
  </StyledWrapper>
);
export default CommonToggle;
