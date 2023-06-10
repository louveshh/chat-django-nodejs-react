import { configBoard } from 'config/config';
import { useSelectBoardAlgorithm } from './selectBoardAlgorithm.hooks';
import { StyledSelect, StyledMenuList } from './selectBoardAlgorithm.styles';

const SelectBoardAlgorithm = () => {
  const { activeMode, handleSelectBoardAlgorithm } = useSelectBoardAlgorithm();
  return (
    <>
      <label htmlFor="selectBoard">Select an option:</label>
      <StyledSelect
        onChange={handleSelectBoardAlgorithm}
        options={configBoard.algorithmOptions}
        components={{ MenuList: StyledMenuList }}
        mode={activeMode}
        aria-labelledby="selectBoard"
        aria-label="selectBoard"
      />
    </>
  );
};

export default SelectBoardAlgorithm;
