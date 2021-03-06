import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const ScoopOptions = ({ name, imagePath, updateItemCount }) => {

  const handleChange = (event) => {
    updateItemCount(name, event.target.value);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
        style={{ width: "30%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{
          marginTop: "10px",
        }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "right" }}>
          <Form.Control type="number" defaultValue={0} onChange={handleChange}
            role="spinbutton" name={name} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOptions;
