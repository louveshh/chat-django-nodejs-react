import { useSelector } from "react-redux";

export const useView = () => {
  const activeMode = useSelector((state) => state.toggle.activeMode);

  return { activeMode };
};
