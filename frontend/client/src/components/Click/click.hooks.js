import { useSelector, useDispatch } from "react-redux";
import { toggleClickPossible } from "store/slices/toggle";
import { setCirclePointZero, setRandomPointsZero } from "store/slices/map";

export const useCLick = () => {
  const isClickable = useSelector((state) => state.toggle.clickPossible);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleClickPossible(!isClickable));
    dispatch(setCirclePointZero());
    dispatch(setRandomPointsZero());
  };
  return { isClickable, handleClick };
};
