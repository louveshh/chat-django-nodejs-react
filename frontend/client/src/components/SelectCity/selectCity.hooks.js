import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSelectStartCity } from "store/slices/map";
import cloneDeep from 'lodash/cloneDeep';
import { useEffect } from "react";
export const useSelectCity = () =>{

  const [selectValue, setSelectValue] = useState()

  const { randomPoints,circlePoint } = useSelector(
    (state) => state.map
  );
  const { clickPossible } = useSelector(
    (state) => state.toggle
  );
  const dispatch = useDispatch()

  const handleSelectCity = (event) => {
    setSelectValue(event)
    const {x,y} = event.value
    dispatch(setSelectStartCity({x,y}))
  }
  const selectValueData = () =>{
    const data = cloneDeep(randomPoints)
    if(clickPossible){
      data.unshift(circlePoint)
    }
    const dataTransfom = data.map(({x,y,name},index)=>({ value: {x:x,y:y}, label: name }))
    return dataTransfom;
  }
  useEffect(()=>{
    setSelectValue(null)
  },[clickPossible])
  return {selectValue, selectValueData, handleSelectCity}
}