import ToggleStyled from 'components/common/CommonToggle/CommonToggle.component';
import { useToggleCLick } from './toggleClick.hooks';

const ToggleClick = () => {
  const { clickPossible, t, handleClick } = useToggleCLick();
  return (
    <ToggleStyled
      id="toggle-click"
      checked={clickPossible}
      onChange={handleClick}
      label={t('toggleClick.label')}
      aria="Toggle Click Map"
    />
    // <div>
    //   <div className="toggle-wrapper">
    //     <label htmlFor="toggle-click">Add Custom Start Point</label>
    //     <Toggle id="toggle-click" checked={clickPossible} value="yes" onChange={handleClick} />
    //   </div>
    // </div>
  );
};

export default ToggleClick;
