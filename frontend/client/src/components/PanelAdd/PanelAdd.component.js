import CommonButton from 'components/common/CommonButton/CommonButton.component';
import DisplayHoverCity from 'components/DisplayHoverCity/DisplayHoverCity';
import PaginationCities from 'components/PaginationBiomes/PaginationBiomes.component';
import CommonBar from 'components/common/CommonBar/CommonBar.component';
import CommonInput from 'components/common/CommonInput/CommonInput.component';
import { StyledForm, StyledDevider } from './panelAdd.styles';
import { usePanelAdd } from './panelAdd.hooks';

const PanelAdd = () => {
  const { t, handleBar, handleInput, onSubmitAdd, onSubmitRemove } =
    usePanelAdd();
  return (
    <>
      <StyledForm onSubmit={onSubmitAdd}>
        <CommonBar
          id="bar-weight-add"
          label={t('addInputWeight.label')}
          aria="Input New City Weight"
          onChange={handleBar}
          min={0}
          max={50}
          step={1}
          defaultValue={0}
        />
        <CommonInput
          id="input-name"
          label={t('addInputName.label')}
          aria="Input Name"
          onChange={handleInput}
        />

        <CommonButton type="submit" disabled={null}>
          {t('panelAdd.addCity')}
        </CommonButton>
      </StyledForm>
      <StyledDevider />
      <StyledForm onSubmit={onSubmitRemove}>
        <CommonButton type="submit" disabled={null}>
          {t('panelAdd.removeCity')}
        </CommonButton>
      </StyledForm>
      <StyledDevider />
      <DisplayHoverCity />
      <StyledDevider />
      <PaginationCities />
    </>
  );
};

export default PanelAdd;
