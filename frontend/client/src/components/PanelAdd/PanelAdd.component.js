import CommonButton from 'components/common/CommonButton/CommonButton.component';
import DisplayHoverCity from 'components/DisplayHoverCity/DisplayHoverCity';
import PaginationCities from 'components/PaginationCities/PaginationCities.component';
import { usePanelAdd } from './panelAdd.hooks';

const PanelAdd = () => {
  const { t } = usePanelAdd();
  return (
    <>
      <CommonButton type="button" onClick={() => {}} disabled={null}>
        {t('panelMap.runButton')}
      </CommonButton>
      <DisplayHoverCity />
      <PaginationCities />
    </>
  );
};

export default PanelAdd;
