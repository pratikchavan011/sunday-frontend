import Container from "react-bootstrap/Container";
import "./App.css";
// import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";

import { OrderDetailsProvider } from "./context/orderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        {/* <SummaryForm /> */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
