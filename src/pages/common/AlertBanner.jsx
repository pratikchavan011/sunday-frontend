import Alert from "react-bootstrap/Alert";

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";
  const alertVatiant = variant || "danger";

  return (
    <Alert variant={alertVatiant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
