import { StyledLabel, StyledInput, StyledWrapper } from './commonInput.styles';

const CommonInput = ({
  id,
  label,
  aria,
  name,
  autocomplete,
  type = 'text',
  required = false,
  onChange = () => {},
}) => (
  <StyledWrapper>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <StyledInput
      id={id}
      aria-label={aria}
      name={name}
      autoComplete={autocomplete}
      type={type}
      required={required}
      onChange={onChange}
    />
  </StyledWrapper>
);

export default CommonInput;
