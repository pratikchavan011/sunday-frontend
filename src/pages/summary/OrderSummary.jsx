import React from "react";

import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/orderDetails";

const OrderSummary = (props) => {
  const [orderDetails] = useOrderDetails();
  const getScoopsAndToppingsDetails = (data, hideCount = false) => {
    const elm = [];

    data.forEach((value, key) => {
      elm.push(
        <p key={`${value}_${key}`}>
          {hideCount ? '' : value} {key}
        </p>
      );
    });

    return elm;
  };
  return (
    <div className="order-summary">
      <h1>Order Summary</h1>
      <h3>Scoops: {orderDetails.totals.scoops}</h3>
      <h3>Toppings: {orderDetails.totals.toppings}</h3>
      {getScoopsAndToppingsDetails(orderDetails.scoops)}
      {getScoopsAndToppingsDetails(orderDetails.toppings, true)}
      <SummaryForm />
    </div>
  );
};

export default React.memo(OrderSummary);
