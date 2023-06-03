import { StyledSVG, StyledG } from './ocean.styles';

const Ocean = () => (
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
      <use
        xlinkHref="#gentle-wave"
        x="30"
        y="12"
        fill="rgba(255,255,255,0.1)"
      />
      <use xlinkHref="#gentle-wave" x="40" y="8" fill="rgba(255,255,255,0.1)" />
      <use
        xlinkHref="#gentle-wave"
        x="30"
        y="14"
        fill="rgba(255,255,255,0.1)"
      />
      <use xlinkHref="#gentle-wave" x="0" y="10" fill="rgba(255,255,255,0.1)" />
    </StyledG>
  </StyledSVG>
);

export default Ocean;
