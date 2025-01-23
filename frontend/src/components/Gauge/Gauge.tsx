import { GaugeProps } from "../../types/types";
import { GAUGE_SETTINGS } from "../../utils/gaugeSettings";

export default function Gauge({ variant, value, unit }: GaugeProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={GAUGE_SETTINGS.VIEW_BOX_PX()}>
      <circle
        fill="none"
        cx="50%"
        cy="50%"
        r={GAUGE_SETTINGS.RADIUS()}
        stroke={GAUGE_SETTINGS.TRACK_COLOR}
        strokeLinecap="round"
        strokeWidth={GAUGE_SETTINGS.TRACK_WIDTH_PX}
        strokeDasharray={GAUGE_SETTINGS.DASH_ARRAY()}
        strokeDashoffset={GAUGE_SETTINGS.TRACK_DASH_OFFSET()}
        transform={GAUGE_SETTINGS.TRACK_TRANSFORM()}
      />
      <circle
        fill="none"
        strokeLinecap="round"
        cx="50%"
        cy="50%"
        r={GAUGE_SETTINGS.RADIUS()}
        stroke={GAUGE_SETTINGS.STROKE_COLOR(variant, value)}
        strokeDasharray={GAUGE_SETTINGS.TRACK_DASH_ARRAY()}
        strokeDashoffset={GAUGE_SETTINGS.VALUE_DASH_OFFSET(variant, value)}
        strokeWidth={GAUGE_SETTINGS.TRACK_WIDTH_PX}
        transform={GAUGE_SETTINGS.TRACK_TRANSFORM()}
      />
      <g>
        <text y="50%" transform="translate(0, 2)">
          <tspan x="50%" textAnchor="middle" className="gauge-percent">
            {variant === "wind"
              ? `${value}${unit}`
              : variant === "pressure"
              ? `${Math.round(value)}`
              : `${value}${unit}`}
          </tspan>
        </text>
        <text y="64%" transform="translate(0, 2)">
          <tspan x="50%" textAnchor="middle" className="gauge-data">
            {variant === "pressure" ? unit : ""}
          </tspan>
        </text>
      </g>
    </svg>
  );
}
