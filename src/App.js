import Container from "react-bootstrap/Container";
import "./App.css";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderConfirmation from "./pages/orderConfirmation/OrderConfirmation";

import { OrderDetailsProvider, useOrderDetails } from "./context/orderDetails";
import { orderPhases } from "./constants";

function Wrapper() {
  const [{ orderPhase }] = useOrderDetails();
  return (
    <>
      {orderPhase === orderPhases.ORDERING ? <OrderEntry /> : null}
      {orderPhase === orderPhases.PAYMENT ? <OrderSummary /> : null}
      {orderPhase === orderPhases.COMPLETE ? <OrderConfirmation /> : null}
    </>
  );
};

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <Wrapper/>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
