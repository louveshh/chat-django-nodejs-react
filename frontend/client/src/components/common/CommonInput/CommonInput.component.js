import { StyledLabel, StyledInput, StyledWrapper } from './commonInput.styles';

const CommonInput = ({
  id,
  label,
  aria,
  name,
  autoComplete,
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
      autoComplete={autoComplete}
      type={type}
      required={required}
      onChange={onChange}
    />
  </StyledWrapper>
);

export default CommonInput;
