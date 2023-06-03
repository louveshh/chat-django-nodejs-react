import { useSelectCity } from './selectCity.hooks';
import { StyledSelect, StyledMenuList } from './selectCity.styles';

const SelectCity = () => {
  const { selectValue, selectValueData, handleSelectCity } = useSelectCity();
  return (
    <StyledSelect
      onChange={handleSelectCity}
      options={selectValueData()}
      value={selectValue}
      className="select"
      components={{ MenuList: StyledMenuList }}
    />
  );
};

export default SelectCity;
