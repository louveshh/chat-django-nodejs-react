import "./map.css";
import { useMap } from "./map.hooks";
import Click from "./../Click/Click";
import SelectCity from './../SelectCity/SelectCity';


const Map = () => {
  const {
    canvasRef,
    clear,
    pathingInProgress,
    activeMode,
    handleCanvasClick,
    handleTSGClick,
    handleSortClick,
    handleDateClick,
    handleRandomClick,
    handleClear,
    handleMouseMove,
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
            onMouseMove={handleMouseMove}
          />
          {!clear && activeMode !== "display" && activeMode !== "add" ? (
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
              {activeMode !== "combo" && <Click />}
              {activeMode !== "combo" &&<SelectCity/> }
            </>
          ) : (
            <>
              {(!pathingInProgress &&
                (activeMode !== "display" && activeMode !== "add")) && (
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
