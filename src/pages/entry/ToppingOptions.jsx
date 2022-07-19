import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const ToppingOptions = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{
          marginTop: "10px",
        }}
      >
        <Col>
          <Form.Check
          type="checkbox"
          id={name}
          name={name}
          label={name}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOptions;
