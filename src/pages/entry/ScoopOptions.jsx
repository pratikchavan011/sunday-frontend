import Col from "react-bootstrap/Col";

const ScoopOptions = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`htt[p://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
        style={{ width: "30%" }}
      />
    </Col>
  );
};

export default ScoopOptions;
