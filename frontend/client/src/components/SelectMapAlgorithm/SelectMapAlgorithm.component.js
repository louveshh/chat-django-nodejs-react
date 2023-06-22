import CommonSelect from 'components/common/CommonSelect/commonSelect.component';
import { useSelectMapAlgorithm } from './selectMapAlgorithm.hooks';

const SelectMapAlgorithm = () => {
  const { options, t, handleSelectMapAlgorithm } = useSelectMapAlgorithm();
  return (
    <CommonSelect
      onChange={handleSelectMapAlgorithm}
      options={options}
      placeholder={t('selectMapAlgorithm.label')}
      aria-label="Select Map Algorithm"
    />
  );
};

export default SelectMapAlgorithm;
