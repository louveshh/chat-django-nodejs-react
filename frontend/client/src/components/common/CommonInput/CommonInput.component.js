import { StyledLabel, StyledInput, StyledWrapper } from './commonInput.styles';

const CommonInput = ({ id, label, aria, onChange }) => (
  <StyledWrapper>
    <StyledLabel htmlFor={id}>{`${label}`}</StyledLabel>
    <StyledInput id={id} aria={aria} onChange={onChange} />
  </StyledWrapper>
);

export default CommonInput;
