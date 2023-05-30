import "./algorithms.css";
import Map from "./../../components/Map/Map";
import Board from "./../../components/Board/Baord";
import "react-toggle/style.css";
import ToggleMode from "components/ToggleMode/ToggleMode";
import { useAlgorithms } from "./algorithms.hooks";
import View from './../../components/View/View';

const Algorithms = () => {
  const {  activeMode  } = useAlgorithms();
  return (
    <View/>
  );
};

export default Algorithms;
