import Options from "./Option";
import { useOrderDetails } from "../../context/orderDetails";
import { orderPhases } from "../../constants";

const OrderEntry = () => {
  const [orderDetails, , setOrderPhaseFn] = useOrderDetails();

  const handleOrderSundeClick = () => {
    setOrderPhaseFn(orderPhases.PAYMENT);
  }

  return (
    <div>
      <Options OptionType="scoops" />
      <Options OptionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <button className="order-sundae" onClick={handleOrderSundeClick}>Order Sundae</button>
    </div>
  );
};

export default OrderEntry;
