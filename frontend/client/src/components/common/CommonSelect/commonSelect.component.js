import {
  StyledSelect,
  StyledMenuList,
  StyledPlaceholder,
  StyledLabel,
  StyledValueContainer,
  StyledOption,
} from './commonSelect.styles';

const CommonSelect = ({
  onChange,
  options,
  aria,
  placeholder,
  label,
  defaultValue = null,
  id = aria || label,
}) => (
  <>
    {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
    <StyledSelect
      onChange={onChange}
      options={options}
      components={{
        MenuList: StyledMenuList,
        Placeholder: StyledPlaceholder,
        ValueContainer: StyledValueContainer,
        Option: StyledOption,
      }}
      aria-label={aria}
      placeholder={placeholder}
      id={id}
      defaultValue={defaultValue}
    />
  </>
);

export default CommonSelect;
