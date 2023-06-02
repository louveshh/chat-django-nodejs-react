import './map.css';
import { useMap } from './map.hooks';
import Click from '../Click/Click';
import SelectCity from '../SelectCity/SelectCity';
import { configMap } from '../../config/config';
import { BackgroundImage, CanvasMap } from './map.styles';

const Map = () => {
  const {
    canvasRef,
    toClear,
    pathingInProgress,
    activeMode,
    theme,
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
          <BackgroundImage theme={theme.name} mode={activeMode} />
          <CanvasMap
            ref={canvasRef}
            width={640}
            height={640}
            className="canvas1"
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            mode={activeMode}
          />
          {!toClear && (activeMode === 'map' || activeMode === 'combo') && (
            <>
              <button type="button" className="button" onClick={handleTSGClick}>
                TSG alg
              </button>
              <button
                type="button"
                className="button"
                onClick={handleSortClick}
              >
                Sort alg
              </button>
              <button
                type="button"
                className="button"
                onClick={handleDateClick}
              >
                Date alg
              </button>
              <button
                type="button"
                className="button"
                onClick={handleRandomClick}
              >
                Random alg
              </button>{' '}
              {activeMode !== 'combo' && <Click />}
              {activeMode !== 'combo' && <SelectCity />}
            </>
          )}
          {!pathingInProgress &&
            toClear &&
            configMap.clearButton.includes(activeMode) && (
              <button type="button" className="button" onClick={handleClear}>
                CLEAR
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Map;
