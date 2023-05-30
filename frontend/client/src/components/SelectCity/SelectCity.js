import React from "react";
import { useSelectCity } from "./selectCity.hooks";
import Select from "react-select";

const SelectCity = () => {
  const { selectValue,selectValueData, handleSelectCity } = useSelectCity();
  return (
    <div>
      <Select
        onChange={handleSelectCity}
        options={selectValueData()}
        value={selectValue}
        className="select"
      />
    </div>
  );
};

export default SelectCity;
