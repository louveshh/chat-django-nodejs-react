import "./algorithms.css";
import Map from "./../../components/Map/Map";
import Board from "./../../components/Board/Baord";
import { useState } from "react";

const CanvasWithCircle = () => {
  const [board, setBoard] = useState(true);
  const [map, setMap] = useState(true);
  const handleBoard = () => {
    setBoard((prev) => !prev);
  };
  const handleMap = () => {
    setMap((prev) => !prev);
  };
  return (
    <div className="all">
      <button className="toggle" onClick={handleBoard}>
        BOARD
      </button>
      <button className="toggle" onClick={handleMap}>
        MAP
      </button>
      <div className="maps-temp">
        <div>
          {map && <Map />}
          {board && <Board />}
        </div>
      </div>
    </div>
  );
};

export default CanvasWithCircle;
