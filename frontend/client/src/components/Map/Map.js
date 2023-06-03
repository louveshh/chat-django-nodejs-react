import { useMap } from './map.hooks';
import Click from '../Click/Click';
import SelectCity from '../SelectCity/SelectCity';
import { configMap, configView } from '../../config/config';
import {
  BackgroundImage,
  CanvasMap,
  MapWrapper,
  ButtonsWrapper,
  CitiesWrapper,
  StyledButton,
} from './map.styles';

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
    <MapWrapper active={configView.mapModes.includes(activeMode)}>
      <CitiesWrapper>xd</CitiesWrapper>
      <BackgroundImage
        theme={theme.name}
        mode={activeMode}
        width={640}
        height={640}
      >
        <CanvasMap
          ref={canvasRef}
          width={640}
          height={640}
          className="canvas1"
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          mode={activeMode}
        />
      </BackgroundImage>
      <ButtonsWrapper mode={activeMode}>
        {!toClear && configMap.settings.includes(activeMode) && (
          <>
            <StyledButton
              type="button"
              className="button"
              onClick={handleTSGClick}
            >
              TSG alg
            </StyledButton>
            <StyledButton
              type="button"
              className="button"
              onClick={handleSortClick}
            >
              Sort alg
            </StyledButton>
            <StyledButton
              type="button"
              className="button"
              onClick={handleDateClick}
            >
              Date alg
            </StyledButton>
            <StyledButton
              type="button"
              className="button"
              onClick={handleRandomClick}
            >
              Random alg
            </StyledButton>{' '}
            {activeMode !== 'combo' && <Click />}
            {activeMode !== 'combo' && <SelectCity />}
          </>
        )}
        {!pathingInProgress &&
          toClear &&
          configMap.clearButton.includes(activeMode) && (
            <StyledButton
              type="button"
              className="button"
              onClick={handleClear}
            >
              CLEAR
            </StyledButton>
          )}
      </ButtonsWrapper>
    </MapWrapper>
  );
};

export default Map;
