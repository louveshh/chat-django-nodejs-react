import SelectStyled from 'components/common/SelectStyled/SelectStyled.component';
import { useSelectBoardAlgorithm } from './selectBoardAlgorithm.hooks';

const SelectBoardAlgorithm = () => {
  const { options, handleSelectBoardAlgorithm } = useSelectBoardAlgorithm();
  return (
    <SelectStyled
      onChange={handleSelectBoardAlgorithm}
      options={options}
      aria-labelledby="Select Board Algorithm"
      aria-label="Select Board Algorithm"
      placeholder="Select Algorithm"
    />
  );
};

export default SelectBoardAlgorithm;
