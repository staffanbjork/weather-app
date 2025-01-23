import Form from 'react-bootstrap/Form';
import ListGroup from "react-bootstrap/ListGroup";
import useLocalityQuery from "../../hooks/useLocalityQuery";
import { GeoData } from "../../types/types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack";



type SearchInputProps = {
  changeLocation: (geoData: GeoData) => void;
}
export default function SearchInput({ changeLocation}: SearchInputProps) {
  const { handleInputChange, handleOnClick, query, results } = useLocalityQuery({ delay: 500, changeLocation });

  return (
    <Col
      xs={12}
      sm={12}
      md={3}
      lg={3}
      xl={3}
      xxl={3}
      className="px-0 position-relative"
      style={{ zIndex: "1300" }}
    >
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Form.Group controlId="localitySearch" className="w-100 m-0 p-0">
            <Form.Control
              type="text"
              placeholder="Välj ort"
              value={query}
              onChange={handleInputChange}
              className="m-0 "
              style={{ backgroundColor: "rgba(170, 205, 255, 0.5)" }}
            />
          </Form.Group>
        </Col>
      </Row>

      {results.length > 0 && (
        <Row className="" style={{ zIndex: "1401" }}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <ListGroup
              className="position-absolute"
              style={{ zIndex: "1402" }}
            >
              {results.map((local) => (
                <ListGroup.Item
                  key={local.locality}
                  action
                  onClick={() => handleOnClick(local)}
                  className="local-search-items"
                  style={{
                    backgroundColor: "rgba(170, 205, 255, 1)",
                    color: "#282828",
                  }}
                >
                  <Stack gap={1} className="w-100">
                    <div className="fs-5 fw-medium d-flex align-items-center justify-content-between w-100 gap-4">
                      {local.locality} <small className="fs-6 justify-self-end align-self-middle text-end fw-light">{local.municipality.toUpperCase()}</small>
                    </div>
                    <div> {local.county} län</div>
                  </Stack>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Col>
  );

}
