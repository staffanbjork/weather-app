



export default function SvgIcon({ path, width, height, windDirection }: { path: { path: string, pathTwo?: string }, width: string, height: string, windDirection?: number }) {
  const rotate = windDirection ? `rotate(${windDirection})` : "";
  return (
    <div className="w-100 d-flex flex-row align-items-center h-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      viewBox={`0 0 16 16`}
      transform={rotate}
      className="currentWeather-temp-icon m-auto"
    >
      <path fill="currentColor" d={path.path} />
      {path.pathTwo && <path fill="currentColor" d={path.pathTwo} />}
    </svg>
     </div>
  );
};
