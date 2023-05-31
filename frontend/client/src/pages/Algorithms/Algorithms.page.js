import "./algorithms.css";
import "react-toggle/style.css";
import { useAlgorithms } from "./algorithms.hooks";
import View from '../../components/View/View.component';

const Algorithms = () => {
  const {  activeMode  } = useAlgorithms();
  return <View/>;
};

export default Algorithms;
