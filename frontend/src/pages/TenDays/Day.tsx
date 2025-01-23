import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import { DayWeatherData } from "../../types/types";



export default function Day({dayAndDate, highestTemp, lowestTemp, windSpeed, gust, weatherSymbol}: DayWeatherData) {
  return (
    <Col xs={5} sm={5} md={4} lg={2} xl={2} xxl={2} className="glass-bg">
      <Stack gap={2} className="py-3 align-items-center">
        <h1>{dayAndDate}</h1>
        <img src={weatherSymbol} width="100%" />
        <h3 className="">
          {highestTemp}° / <small className="fs-6">{lowestTemp}°</small>
        </h3>
        <div>
          {windSpeed} ({gust}) m/s
        </div>
      </Stack>
    </Col>
  );
}