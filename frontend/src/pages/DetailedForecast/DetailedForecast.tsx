import { useWeatherData } from "../../hooks/useGetWeather";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import Widget from "../../components/Widget/Widget";
import useDetailedWeather from "../../hooks/useDetailedWeather";
import Wind from "../../components/Wind/Wind";

export function Component() {
  const { data } = useWeatherData();
  document.title = `Vädret i ${data?.location.locality} - Timme för timme`
  const {
    weather,
    wind,
    pressure,
    humidity,
    nextHour,
    prevHour,
    getNextHour,
    getPrevHour,
  } = useDetailedWeather(data!.weatherData.timeSeries);

  return (
    <section className="today-section mb-5 pb-5">
      {weather && (
        <Container fluid>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mb-5 mt-4 mt-md-2"
            >
              <Row>
                <Col
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="fs-5 align-self-center ps-5"
                  onClick={() => getPrevHour()}
                  style={{ cursor: "pointer" }}
                >
                  <h1>{prevHour && `< ${prevHour}.00`}</h1>
                </Col>

                <Col
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="fs-5 text-end align-self-center pe-5"
                  style={{ cursor: "pointer" }}
                  onClick={() => getNextHour()}
                >
                  <h1>{nextHour && `${nextHour}.00 >`}</h1>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <h1 className="text-center fw-bold">
                    {data!.location.locality}
                  </h1>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} xl={12} className="mb-4">
              <CurrentWeather {...weather} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} xl={12} className="pe-md-0 ps-md-0 me-0 mt-2">
              <Row className="d-flex flex-lg-row w-100 px-0 gap-md-3 mt-4 justify-content-md-end mx-0 pe-md-2 pe-lg-0 pe-0">
                <Col
                  xs={12}
                  sm={12}
                  md={5}
                  lg={4}
                  xl={4}
                  xxl={4}
                  className="mb-5"
                >
                  <Wind {...wind} />
                </Col>
                {/* --- Humidity --- */}
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  xxl={3}
                  className="mb-4"
                >
                  <Widget {...humidity} />
                </Col>
                {/* --- Pressure --- */}
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  xxl={3}
                  className="me-0"
                >
                  <Widget {...pressure} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </section>
  );
}

Component.displayName = "DetailedForecast";