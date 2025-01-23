import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { parseTwentyFourHour } from "../../utils/parseTwentyFourHours";
import { useWeatherData } from "../../hooks/useGetWeather";
import Hour from "./Hour";




export function Component() {
  const { data } = useWeatherData();
  document.title = `Vädret i ${data?.location.locality} - 24-timmarsprognos`;
  const hours = useMemo(() => parseTwentyFourHour(data!.weatherData.timeSeries), [data])

  return (
    <Container>
      <Row className="my-5 ms-4">
        <Col xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <h1>24-timmarsprognos</h1>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <h1 className="fw-bold">{data?.location.locality}</h1>
        </Col>
      </Row>
      <Row className="d-flex flex-row justify-content-center mx-2 mx-sm-0">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Row
                className="d-flex flex-row flex-nowrap overflow-y-hidden overflow-x-auto py-2"
                style={{
                  scrollSnapType: "x proximity ",
                  scrollbarColor:
                    "rgba(170, 205, 255, 0.6) rgba(170, 205, 255, 0.3)",
                  scrollbarWidth: "thin",
                }}
              >
                {hours.map((hour) => (
                  <Hour
                    {...hour}
                    key={`${hour.validDateTime.day}${hour.validDateTime.hour}`}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
  
}

Component.displayName = "TwentyFourHourForecast";