import {
  CustomSelect,
  CustomMenuList,
  CustomPlaceholder,
  CustomLabel,
  CustomValueContainer,
  CustomOption,
} from './selectStyled.styles';

const SelectStyled = ({
  onChange,
  options,
  labelledby,
  aria,
  placeholder,
  label,
  defaultValue = null,
  id = aria || label,
}) => (
  <>
    {label && <CustomLabel htmlFor={id}>{label}</CustomLabel>}
    <CustomSelect
      onChange={onChange}
      options={options}
      components={{
        MenuList: CustomMenuList,
        Placeholder: CustomPlaceholder,
        ValueContainer: CustomValueContainer,
        Option: CustomOption,
      }}
      aria-labelledby={labelledby}
      aria-label={aria}
      placeholder={placeholder}
      id={id}
      defaultValue={defaultValue}
    />
  </>
);

export default SelectStyled;
