import "./algorithms.css";
import Map from "./../../components/Map/Map";
import Board from "./../../components/Board/Baord";
import "react-toggle/style.css";
import ToggleMode from "components/ToggleMode/ToggleMode";
import { useAlgorithms } from "./algorithms.hooks";

const Algorithms = () => {
  const {  activeMode  } = useAlgorithms();
  return (
    <div className="all">
      <ToggleMode />
      <div className="maps-temp">
        <div>
          {( activeMode  === "map" ||  activeMode  === "display" ||  activeMode  === "combo" ||  activeMode  === "add") && <Map />}
          {( activeMode  === "board" ||  activeMode  === "combo") && <Board />}
        </div>
      </div>
    </div>
  );
};

export default Algorithms;
