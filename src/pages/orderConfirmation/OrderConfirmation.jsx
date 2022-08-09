import React from "react";
import axios from "axios";

import { useOrderDetails } from "../../context/orderDetails";

const OrderConfirmation = (props) => {
  const [getOrderNumber, setOrderNumber] = React.useState(null);
  const [, , , resetOrder] = useOrderDetails();

  React.useEffect(() => {
    // ComponentDidMount
    axios
      .post("http://localhost:3030/order")
      // .then(res => res.json())
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {
        //TODO
        console.log(
          "🚀 ~ file: OrderConfirmation.jsx ~ line 14 ~ React.useEffect ~ err",
          err
        );
      });
  }, []);

  const handleCreateNewOrderBtnClick = () => {
    // redirect on main page, And reset the old order data.
    resetOrder();
  };

  if (getOrderNumber === null) return <h1>Loading...</h1>;

  return (
    <div className="order-confirmation">
      <h1>Thank You!</h1>
      <h3>Your order number is {getOrderNumber}</h3>
      <p className="t-and-c">
        As per our terms and conditions, nothing will happen now.
      </p>
      <button
        className="create-new-order-btn"
        onClick={handleCreateNewOrderBtnClick}
      >
        Create New Order
      </button>
    </div>
  );
};

export default React.memo(OrderConfirmation);
