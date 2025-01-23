import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchInput from "../SearchInput/SearchInput";
import { GeoData } from "../../types/types";
import { useNavigate } from "react-router";

export default function Menu({showMenu, setShowMenu, changeLocation}: {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
  changeLocation: (newLocality: GeoData) => void;
  }) {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    setShowMenu(false);
    navigate(path);
  }
  const handleChangeLocation = (newLocality: GeoData) => {
    changeLocation(newLocality)
    setShowMenu(false);
  }
  return (
    <Offcanvas
      show={showMenu}
      onHide={() => setShowMenu(false)}
      placement="end"
      className="glass-bg"
    >
      <Offcanvas.Header closeButton closeLabel="Stäng meny">
        <Offcanvas.Title>Meny</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="">
        <Container className="h-100">
          <Row xs={12} md={12} xxl={12}
            className="d-flex flex--column justify-content-between h-100 p-3 "
          >
            <SearchInput changeLocation={handleChangeLocation} />
 
            <Col xs={12} sm={12}
              className="align-items-center mt-auto"
            >
              <Row xs={1} sm={1}
                className="fs-5 d-flex flex-column row-gap-5 py-5"
              >
                <Col xs={12} sm={12}
                  className="px-0"
                  onClick={() => handleNavigate("/")}
                  style={{cursor: "pointer"}}
                >
                  Timme för timme
                </Col>
                <Col xs={12} sm={12}
                  className="px-0"
                  onClick={() => handleNavigate("/24timmar")}
                  style={{cursor: "pointer"}}
                >
                  24-timmarprognos
                </Col>
                <Col xs={12} sm={12}
                  className="px-0"
                  onClick={() => handleNavigate("/10dagar")}
                  style={{cursor: "pointer"}}
                >
                  10-dygnsprognos
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
