import CommonSelect from 'components/common/CommonSelect/commonSelect.component';
import { useSelectBoardAlgorithm } from './selectBoardAlgorithm.hooks';

const SelectBoardAlgorithm = () => {
  const { options, t, handleSelectBoardAlgorithm } = useSelectBoardAlgorithm();
  return (
    <CommonSelect
      onChange={handleSelectBoardAlgorithm}
      options={options}
      placeholder={t('selectBoardAlgorithm.label')}
      aria-label="Select Board Algorithm"
    />
  );
};

export default SelectBoardAlgorithm;
