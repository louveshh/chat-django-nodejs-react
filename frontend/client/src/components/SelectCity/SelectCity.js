import { useSelectCity } from './selectCity.hooks';
import { StyledSelect, StyledMenuList } from './selectCity.styles';

const SelectCity = () => {
  const { selectValue, activeMode, selectValueData, handleSelectCity } =
    useSelectCity();
  return (
    <StyledSelect
      onChange={handleSelectCity}
      options={selectValueData()}
      value={selectValue}
      className="select"
      components={{ MenuList: StyledMenuList }}
      mode={activeMode}
    />
  );
};

export default SelectCity;
