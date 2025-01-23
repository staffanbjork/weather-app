import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { WindProps } from "../../types/types";
import SvgIcon from "../SvgIcon/SvgIcon";

export default function Wind({
  icon,
  windSpeed,
  windDirection,
  gust,
}: WindProps) {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Card className="glass-bg">
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card.Header as="h5" className="">
                  <Row>
                    <Col
                      xs={3}
                      sm={2}
                      md={3}
                      lg={3}
                      xl={3}
                      xxl={3}
                      className="text-start px-3 px-md-2"
                    >
                      <SvgIcon path={icon} width="100%" height="100%" />
                    </Col>
                  </Row>
                </Card.Header>
              </Col>
            </Row>

            <Row className="py-1">
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {/* Wind direction */}
                <Row>
                  <Col
                    xs={6}
                    sm={6}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    className="d-flex flex-row justify-content-center align-items-center w-100"
                  >
                    <Row className="d-flex justify-content-center p-4 p-md-1 mb-sm-3 mb-md-0">
                      <Col xs={4} sm={3} md={7} lg={5} xl={5} xxl={5} className="d-flex justify-content-center align-items-center flex-row mb-md-3 mb-lg-1 ps-sm-1 p-lg-2">
                        <SvgIcon
                          path={windDirection.icon}
                          width="100%"
                          height="100%"
                          windDirection={windDirection.value}
                        />
                      </Col>
                      <Col
                        xs={8}
                        sm={9}
                        md={12}
                        lg={12}
                        xl={12}
                        xxl={12}
                        className="d-flex flex-row justify-content-center align-items-center my-lg-2"
                      >
                        <h3 className="wind-widget-wind-direction fs-1">
                          {windDirection.title}
                        </h3>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Windspeed */}
                <Row className="d-flex flex-row px-4 px-md-3 px-lg-3">
                  <Col xs={6} sm={6} md={6} lg={7} xl={7} xxl={7} className="">
                    <h4 className="wind-widget-values fs-3 p-0 m-0">Vindstyrka</h4>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={5} xl={5} xxl={5}>
                    <h4 className="wind-widget-values fs-3 p-0 m-0">
                      {windSpeed.value} {windSpeed.unit}
                    </h4>
                  </Col>
                </Row>

                {/* Gust */}
                <Row className="d-flex flex-row px-4 px-md-3 mb-2">
                  <Col xs={6} sm={6} md={6} lg={7} xl={7} xxl={7}>
                    <h4 className="wind-widget-values fs-3">Byvind</h4>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={5} xl={5} xxl={5}>
                    <h4 className="wind-widget-values fs-3">
                      {gust.value} {gust.unit}
                    </h4>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
