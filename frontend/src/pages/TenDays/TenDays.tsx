import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Day from "./Day";
import { useWeatherData } from "../../hooks/useGetWeather";
import { useMemo } from "react";
import { parseTenDays } from "../../utils/parseTenDays";



export function Component() {
  const { data } = useWeatherData();
  document.title = `Vädret i ${data?.location.locality} - 10-dygnsprognos`;
  const days = useMemo(() => parseTenDays(data!.weatherData.timeSeries), [data])
  return (
    <Container className="mb-5 pb-5">
      <Row className="my-5">
        <Col xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <h1 className="">10-dygnsprognos</h1>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <h1 className="fw-bold">{data!.location.locality}</h1>
        </Col>
      </Row>
      <Row xs={2} sm={2} md={3} lg={5} xl={5} xxl={5} className="row-gap-4 gap-4 justify-content-center mb-5">
        {days.map((day) => (
          <Day {...day} key={day.dayAndDate} />
        ))}
      </Row>
    </Container>
  );
}

Component.displayName = "TenDayForecast";