import { useMap } from './map.hooks';

import { configView } from '../../config/config';
import { BackgroundImage, CanvasMap } from './map.styles';

const Map = ({ canvasRef }) => {
  const { activeMode, theme, handleCanvasClick, handleMouseMove } =
    useMap(canvasRef);

  return (
    <BackgroundImage
      theme={theme.name}
      mode={activeMode}
      active={configView.mapModes.includes(activeMode)}
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
  );
};

export default Map;
