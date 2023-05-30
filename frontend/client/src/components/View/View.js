import "./view.css";
import Map from "./../../components/Map/Map";
import Board from "./../../components/Board/Baord";
import "react-toggle/style.css";
import ToggleMode from "components/ToggleMode/ToggleMode";
import { useView } from "./view.hooks";
import { configView } from "../../config/config"

const View = () => {
  const {  activeMode  } = useView();
  return (
    <div className="all">
      <ToggleMode />
      <div className="maps-temp">
        <div>
          {configView.mapModes.includes(activeMode) && <Map />}
          {configView.boardModes.includes(activeMode)  && <Board />}
        </div>
      </div>
    </div>
  );
};

export default View;
