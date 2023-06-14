import CommonSelect from 'components/common/CommonSelect/commonSelect.component';
import { useSelectCity } from './selectCity.hooks';

const SelectCity = () => {
  const { selectValueData, handleSelectCity } = useSelectCity();
  return (
    <CommonSelect
      onChange={handleSelectCity}
      options={selectValueData}
      defaultValue={selectValueData[0]}
      label="Select Cities"
      aria-labelledby="Select Cities Map"
      aria-label="Select Cities Map"
    />
  );
};

export default SelectCity;
