import { useEffect } from "react";
import { createContext, useContext, useState, useMemo } from "react";

import { pricePerItem } from "../constants";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
  //   return amount;
}

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider.

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

export function OrderDetailsProvider(props) {
  const [optionsCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  function calculateSubtotal(cOptionType, cOptionCounts) {
    let optionCount = 0;
    for (const count of cOptionCounts[cOptionType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[cOptionType];
  }

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionsCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionsCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionsCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, OptionType) {
      const newOptionCounts = { ...optionsCounts };
      const optionCountsMap = optionsCounts[OptionType];

      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    //getter: Object containing option count for scoops and toppings. subtotal sand totals.
    //setter: updateObjectCount
    return [{ ...optionsCounts, totals }, updateItemCount];
  }, [optionsCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
