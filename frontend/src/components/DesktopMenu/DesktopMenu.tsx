import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchInput from "../SearchInput/SearchInput";
import { GeoData } from "../../types/types";
import { useNavigate } from "react-router";
import Navbar from "react-bootstrap/Navbar";


export default function DesktopMenu({ changeLocation }: { changeLocation: (local: GeoData) => void }) {
  const navigate = useNavigate();

  return (
    <Navbar className="d-none d-md-flex flex-row justify-content-between align-items-center w-100">
      <Container className="h-100 w-100" fluid>
        <Row
          xs={12}
          md={12}
          xxl={12}
          className="d-flex flex-row justify-content-between align-items-center h-100 p-3 w-100"
        >
          <SearchInput changeLocation={changeLocation} />
          <Col
            md={3}
            lg={3}
            xl={3}
            xxl={3}
            className="px-0 text-center"
            onClick={() => navigate("/")}
            style={{cursor: "pointer"}}
          >
            Timme för timme
          </Col>
          <Col
            md={3}
            lg={3}
            xl={3}
            xxl={3}
            className="px-0 text-center"
            style={{cursor: "pointer"}}
            onClick={() => navigate("/24timmar")}
          >
            24-timmarprognos
          </Col>
          <Col
            md={3}
            lg={3}
            xl={3}
            xxl={3}
            className="px-0 text-center"
            style={{cursor: "pointer"}}
            onClick={() => navigate("/10dagar")}
          >
            10-dygnsprognos
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}