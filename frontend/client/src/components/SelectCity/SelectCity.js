import { useSelectCity } from './selectCity.hooks';
import { StyledSelect, StyledMenuList } from './selectCity.styles';

const SelectCity = () => {
  const { activeMode, selectValueData, handleSelectCity } = useSelectCity();
  return (
    <>
      Select City
      <StyledSelect
        onChange={handleSelectCity}
        options={selectValueData}
        defaultValue={selectValueData[0]}
        components={{ MenuList: StyledMenuList }}
        mode={activeMode}
      />
    </>
  );
};

export default SelectCity;
