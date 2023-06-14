import CommonSelect from 'components/common/CommonSelect/commonSelect.component';
import { useSelectBoardAlgorithm } from './selectBoardAlgorithm.hooks';

const SelectBoardAlgorithm = () => {
  const { options, handleSelectBoardAlgorithm } = useSelectBoardAlgorithm();
  return (
    <CommonSelect
      onChange={handleSelectBoardAlgorithm}
      options={options}
      aria-labelledby="Select Board Algorithm"
      aria-label="Select Board Algorithm"
      placeholder="Select Algorithm"
    />
  );
};

export default SelectBoardAlgorithm;
