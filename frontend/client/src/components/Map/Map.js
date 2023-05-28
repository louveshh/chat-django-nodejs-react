import "./map.css";
import { useMap } from "./map.hooks";

const Map = () => {
  const {
    canvasRef,
    handleCanvasClick,
    handleTSGClick,
    handleSortClick,
    handleDateClick,
    handleRandomClick,
    handleClear,
    clear,
    pathingInProgres,
  } = useMap();
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
          {!clear ? (
            <>
              <button className="button" onClick={handleTSGClick}>
                TSG alg
              </button>
              <button className="button" onClick={handleSortClick}>
                Sort alg
              </button>
              <button className="button" onClick={handleDateClick}>
                Date alg
              </button>
              <button className="button" onClick={handleRandomClick}>
                Random alg
              </button>{" "}
            </>
          ) : (
            <>
              {!pathingInProgres && (
                <button className="button" onClick={handleClear}>
                  CLEAR
                </button>
              )}
            </>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
