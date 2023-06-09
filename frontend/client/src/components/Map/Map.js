import { useMap } from './map.hooks';

import { BackgroundImage, CanvasMap } from './map.styles';
import { configDisplay } from '../../config/config';

const Map = ({ canvasRef, active }) => {
  const { activeMode, theme, handleCanvasClick, handleMouseMove } =
    useMap(canvasRef);

  return (
    <BackgroundImage theme={theme.name} mode={activeMode} active={active}>
      <CanvasMap
        ref={canvasRef}
        width={configDisplay.DISPLAY_SIZE}
        height={configDisplay.DISPLAY_SIZE}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        mode={activeMode}
      />
    </BackgroundImage>
  );
};

export default Map;
