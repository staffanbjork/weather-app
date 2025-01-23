import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { WeatherProps } from "../../types/types";
import SvgIcon from "../SvgIcon/SvgIcon";

export default function CurrentWeather({ weatherSymbol, temp, sunrise, sunset,  thunder, precipitationCategory, rain, cloudiness, visibility }: WeatherProps) {
  return (
    <Container fluid className="px-2">
      <Card className="" style={{ background: "transparent", border: "0" }}>
        <Row className="d-flex flex-row flex-wrap">
          <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="p-4">
            <Row>
              <Col xs={12} md={12} xxl={12}>
                <Card.Img
                  variant="top"
                  src={weatherSymbol.icon}
                  className="w-100"
                />
              </Col>
            </Row>
            <Card.Body>
              <Row>
                <Col xs={12} md={12} xxl={12}>
                  <Card.Title className="text-center fs-1">
                    <h1>{weatherSymbol.category}</h1>
                  </Card.Title>
                </Col>
              </Row>
              <Row className="d-flex flex-row justify-content-center">
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Row>
                    <Col xs={4} sm={4} md={4} xxl={4} className="">
                      <SvgIcon
                        width={"100%"}
                        height={"100%"}
                        path={temp.icon}
                      />
                    </Col>
                    <Col xs={8} md={8} xxl={8}>
                      <h1 className="fs-1 currentweather-temp-h1">
                        {temp.value}&deg;
                      </h1>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Col>
          <Col
            xs={11}
            sm={11}
            md={8}
            lg={8}
            xl={8}
            xxl={8}
            className="glass-bg px-4 mx-auto py-3"
          >
            {/* Sunrise */}
            <Row className="py-2 px-0 px-md-3">
              <Col
                xs={3}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="fs-1 my-auto py-0"
              >
                <SvgIcon path={sunrise.icon} width="75%" height="75%" />
              </Col>
              <Col
                xs={5}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="my-auto px-0 px-sm-4"
              >
                <h3 className="fs-2"> {sunrise.title}</h3>
              </Col>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                className="text-end my-auto ps-0 pe-1 pe-sm-3"
              >
                <h3 className="fs-2">{sunrise.value}</h3>
              </Col>
            </Row>
            {/* Sunset */}
            <Row className="py-2 px-0 px-md-3">
              <Col
                xs={3}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="fs-1 py-0 my-auto"
              >
                {/* <i className={sunset.icon}></i> */}
                <SvgIcon path={sunset.icon} width="75%" height="75%" />
              </Col>
              <Col
                xs={5}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="my-auto px-0 px-sm-4"
              >
                <h3 className=""> {sunset.title}</h3>
              </Col>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                className="text-end my-auto ps-0 pe-1 pe-sm-3"
              >
                <h3 className="fs-2">{sunset.value}</h3>
              </Col>
            </Row>
            {/* Precipitation */}
            <Row className="py-2 px-0 px-md-3">
              <Col
                xs={3}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="fs-1 py-0 my-auto"
              >
                <SvgIcon
                  path={precipitationCategory.icon}
                  width="75%"
                  height="75%"
                />
              </Col>
              <Col
                xs={5}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="my-auto px-0 px-sm-4"
              >
                <h3 className="fs-2">{precipitationCategory.value}</h3>
              </Col>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                className="text-end my-auto ps-0 pe-1 pe-sm-3"
              >
                <h3>
                  {precipitationCategory.value !== "Ingen nederbörd" &&
                    `${rain.value} ${rain.unit}`}
                </h3>
              </Col>
            </Row>

            {/* Thunder */}
            <Row className="py-2 px-0 px-md-3">
              <Col
                xs={3}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="fs-1 py-0 my-auto"
              >
                <SvgIcon path={thunder.icon} width="75%" height="75%" />
              </Col>
              <Col
                xs={5}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="my-auto px-0 px-sm-4"
              >
                <h3 className="fs-2">{thunder.title}</h3>
              </Col>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                className="text-end my-auto ps-0 pe-1 pe-sm-3"
              >
                <h3 className="fs-2">
                  {thunder.value} {thunder.unit}
                </h3>
              </Col>
            </Row>
            {/* Visibility */}
            <Row className="py-2 px-0 px-md-3">
              <Col
                xs={3}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="fs-1 py-0 my-auto"
              >
                <SvgIcon path={visibility.icon} width="75%" height="75%" />
              </Col>
              <Col
                xs={5}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="my-auto px-0 px-sm-4"
              >
                <h3 className="fs-2">{visibility.title}</h3>
              </Col>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                className="text-end my-auto ps-0 pe-1 pe-sm-3"
              >
                <h3 className="fs-2">
                  {visibility.value} {visibility.unit}
                </h3>
              </Col>
            </Row>

            {/* Cloudiness */}
            <Row className="py-2 px-0 px-md-3">
              <Col
                xs={3}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="fs-1 py-0 my-auto"
              >
                <SvgIcon path={cloudiness.icon} width="75%" height="75%" />
              </Col>
              <Col
                xs={5}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="my-auto px-0 px-sm-4"
              >
                <h3 className="fs-2">{cloudiness.title}</h3>
              </Col>
              <Col
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                className="text-end my-auto ps-0 pe-1 pe-sm-3"
              >
                <h3 className="fs-2">{cloudiness.value}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}