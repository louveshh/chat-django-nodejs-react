import CommonSelect from 'components/common/CommonSelect/commonSelect.component';
import { configBoard } from 'config/config';
import { useSelectBoardDraw } from './selectBoardDraw.hooks';

const SelectBoardDraw = () => {
  const { selectedOption, updateSelectedOption } = useSelectBoardDraw();
  return (
    <CommonSelect
      onChange={updateSelectedOption}
      value={selectedOption}
      options={configBoard.drawOptions}
      defaultValue={configBoard.drawOptions[0]}
    />
  );
};

export default SelectBoardDraw;
