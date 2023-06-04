import { configBoard } from 'config/config';
import { useSelectBoardAlgorithm } from './selectBoardAlgorithm.hooks';
import { StyledSelect, StyledMenuList } from './selectBoardAlgorithm.styles';

const SelectBoardAlgorithm = () => {
  const { activeMode, handleSelectBoardAlgorithm } = useSelectBoardAlgorithm();
  return (
    <StyledSelect
      onChange={handleSelectBoardAlgorithm}
      options={configBoard.algorithmOptions}
      components={{ MenuList: StyledMenuList }}
      mode={activeMode}
    />
  );
};

export default SelectBoardAlgorithm;
