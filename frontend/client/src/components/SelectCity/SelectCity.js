import Select from 'react-select';
import { useSelectCity } from './selectCity.hooks';

const SelectCity = () => {
  const { selectValue, selectValueData, handleSelectCity } = useSelectCity();
  return (
    <div>
      <Select
        onChange={handleSelectCity}
        options={selectValueData()}
        value={selectValue}
        className="select"
      />
    </div>
  );
};

export default SelectCity;
