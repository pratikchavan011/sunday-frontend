import Options from "./Option";
import { useOrderDetails } from "../../context/orderDetails";

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options OptionType="scoops" />
      <Options OptionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;
