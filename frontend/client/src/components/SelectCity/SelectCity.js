import Select from 'react-select';
import { useSelectCity } from './selectCity.hooks';
import { StyledMenuList } from './selectCity.styles';

const SelectCity = () => {
  const { selectValue, selectValueData, handleSelectCity } = useSelectCity();
  return (
    <Select
      onChange={handleSelectCity}
      options={selectValueData()}
      value={selectValue}
      className="select"
      components={{ MenuList: StyledMenuList }}
    />
  );
};

export default SelectCity;
