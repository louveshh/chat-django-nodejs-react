import CommonSelect from 'components/common/CommonSelect/commonSelect.component';
import { useSelectBoardDraw } from './selectBoardDraw.hooks';

const SelectBoardDraw = () => {
  const { selectedOption, options, translateDefault, updateSelectedOption } =
    useSelectBoardDraw();
  return (
    <CommonSelect
      onChange={updateSelectedOption}
      value={selectedOption}
      options={options}
      defaultValue={translateDefault}
      aria-label="Select Draw Options"
    />
  );
};

export default SelectBoardDraw;
