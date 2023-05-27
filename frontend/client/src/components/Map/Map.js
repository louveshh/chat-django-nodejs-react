import "./map.css";
import { useMap } from "./map.hooks";

const Map = () => {
  const { canvasRefPath, canvasRef, handleCanvasClick, handleTLSClick, handleSortClick } = useMap();
  return (
    <div>
      <div>
        <div className="parent-canvas">
          <div className="image"></div>
              <canvas
                ref={canvasRef}
                width={640}
                height={640}
                className="canvas1"
                onClick={handleCanvasClick}
              />
              <button className="button">TSL alg</button>
          <div>
            <canvas
              ref={canvasRefPath}
              width={640}
              height={640}
              className="canvas2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
