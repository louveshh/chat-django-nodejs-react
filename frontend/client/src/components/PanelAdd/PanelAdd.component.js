import CommonButton from 'components/common/CommonButton/CommonButton.component';
import DisplayHoverCity from 'components/DisplayHoverCity/DisplayHoverCity';
import PaginationCities from 'components/PaginationCities/PaginationCities.component';
import CommonBar from 'components/common/CommonBar/CommonBar.component';
import { StyledForm } from './panelAdd.styles';
import { usePanelAdd } from './panelAdd.hooks';

const PanelAdd = () => {
  const { t, handleBar, onSubmit } = usePanelAdd();
  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <CommonButton type="submit" disabled={null}>
          Add City
        </CommonButton>
        123
        <CommonBar
          id="bar-weight-add"
          label={t('barWeight.label')}
          aria="Input Weight"
          onChange={handleBar}
          min={0}
          max={50}
          step={1}
          defaultValue={0}
        />
      </StyledForm>

      <DisplayHoverCity />
      <PaginationCities />
    </>
  );
};

export default PanelAdd;
