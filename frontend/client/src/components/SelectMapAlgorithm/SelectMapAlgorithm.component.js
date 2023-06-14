import CommonSelect from 'components/common/CommonSelect/commonSelect.component';
import { useSelectMapAlgorithm } from './selectMapAlgorithm.hooks';

const SelectMapAlgorithm = () => {
  const { options, handleSelectMapAlgorithm } = useSelectMapAlgorithm();
  return (
    <CommonSelect
      onChange={handleSelectMapAlgorithm}
      options={options}
      placeholder="Select Algorithm"
      aria-labelledby="Select Map Algorithm"
      aria-label="Select Map Algorithm"
    />
  );
};

export default SelectMapAlgorithm;
