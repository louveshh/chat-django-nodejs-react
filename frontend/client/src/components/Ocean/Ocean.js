import './ocean.styles.css';

const Ocean = ({ children }) => (
  <div className="container">
    {children}
    <svg
      className="waves"
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
      <g className="parallax">
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="1"
          fill="rgba(255,255,255,0.1)"
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="2"
          fill="rgba(255,255,255,0.1)"
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="3"
          fill="rgba(255,255,255,0.1)"
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="5"
          fill="rgba(255,255,255,0.1)"
        />
      </g>
    </svg>
  </div>
);

export default Ocean;
