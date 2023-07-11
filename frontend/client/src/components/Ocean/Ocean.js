import { StyledSVG, StyledG, SVGWrapper } from './ocean.styles';
import { useOcean } from './ocean.hooks';

const Ocean = () => {
  const { color } = useOcean();
  return (
    <SVGWrapper>
      <StyledSVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <StyledG>
          <use xlinkHref="#gentle-wave" x="30" y="12" fill={color} />
          <use xlinkHref="#gentle-wave" x="40" y="8" fill={color} />
          <use xlinkHref="#gentle-wave" x="30" y="14" fill={color} />
          <use xlinkHref="#gentle-wave" x="0" y="10" fill={color} />
        </StyledG>
      </StyledSVG>
    </SVGWrapper>
  );
};

export default Ocean;
