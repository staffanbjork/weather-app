import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import { TwentyFourHour } from "../../types/types";
import SvgIcon from "../../components/SvgIcon/SvgIcon";

const ICON_PATH = {
  path: "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z",
}

export default function Hour({validDateTime, temp, rain, wind, weatherSymbol}: TwentyFourHour) {
  return (
    <Col
      xs={4}
      sm={3}
      md={2}
      lg={2}
      xl={2}
      xxl={2}
      className=""
      style={{ scrollSnapAlign: "end" }}
    >
      <Stack gap={3} className="glass-bg py-3">
        <div className="fs-5 text-center">
          <h2>{validDateTime.hour.toString().padStart(2, "0")}.00</h2>
        </div>
        <div className="text-center">
          {validDateTime.day} / {validDateTime.month}
        </div>

        <div>
          <img src={weatherSymbol} width="100%" />
        </div>
        <div className="fs-4 text-center">
          {temp.value}
          {temp.unit}
        </div>
        <div className="text-center">
          {rain.value} {rain.unit}
        </div>
        <div className="">
            <SvgIcon
              path={ICON_PATH}
              width="30%"
              height="30%"
              windDirection={wind.windDirection}
            />
        </div>
        <div className="text-center">
          {wind.windSpeedValue} ({wind.gustValue})
        </div>
        <div className="text-center">{wind.unit}</div>
      </Stack>
    </Col>
  );
}