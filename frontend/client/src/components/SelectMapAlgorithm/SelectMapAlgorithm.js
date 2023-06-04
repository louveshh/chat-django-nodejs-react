import { configMap } from 'config/config';
import { useSelectMapAlgorithm } from './selectMapAlgorithm.hooks';
import { StyledSelect, StyledMenuList } from './selectMapAlgorithm.styles';

const SelectMapAlgorithm = () => {
  const { activeMode, handleSelectMapAlgorithm } = useSelectMapAlgorithm();
  return (
    <StyledSelect
      onChange={handleSelectMapAlgorithm}
      options={configMap.algorithmOptions}
      components={{ MenuList: StyledMenuList }}
      mode={activeMode}
    />
  );
};

export default SelectMapAlgorithm;
