import { CustomToggle, CustomLabel, StyledWrapper } from './toggleStyled.styles';

const ToggleStyled = ({
  checked,
  onChange,
  labelledby,
  aria,
  label,
  icons,
  id = aria || label,
}) => (
  <StyledWrapper>
    {label && <CustomLabel htmlFor={id}>{label}</CustomLabel>}
    <CustomToggle
      id={id}
      checked={checked}
      onChange={onChange}
      aria-labelledby={labelledby}
      aria-label={aria}
      icons={icons}
    />
  </StyledWrapper>
);
export default ToggleStyled;
