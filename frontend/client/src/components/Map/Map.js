import { useMap } from './map.hooks';

import { BackgroundImage, CanvasMap } from './map.styles';

const Map = ({ canvasRef, active }) => {
  const { activeMode, theme, handleCanvasClick, handleMouseMove } =
    useMap(canvasRef);

  return (
    <BackgroundImage theme={theme.name} mode={activeMode} active={active}>
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
