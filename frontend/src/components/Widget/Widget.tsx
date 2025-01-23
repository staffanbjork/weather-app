import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { WidgetProps } from "../../types/types";
import Gauge from "../Gauge/Gauge";
import SvgIcon from "../SvgIcon/SvgIcon";

export default function Widget({variant, title, icon, value, unit}: WidgetProps) {
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
                      xs={5} sm={4} md={5} lg={4} xl={4} xxl={4}
                      className="text-start ">
                      <SvgIcon path={icon} width="100%" height="100%" />
                    </Col>
                  </Row>
                </Card.Header>
              </Col>
            </Row>

            <Row>
              <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} className="mx-auto mt-4">
                <Gauge
                  variant={variant}
                  value={value}
                  unit={unit}
                />
              </Col>
            </Row>
            <Row>
              <Col  xs={12}  sm={12}  md={12}  lg={12}  xl={12}  xxl={12}
                className="text-center fw-bold fs-5 my-3">
                  <h3>{title}</h3>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}