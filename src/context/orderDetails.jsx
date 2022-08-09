import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { pricePerItem, orderPhases } from "../constants";
import { formatCurrency } from "../utilities";

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
  const zeroCurrency = formatCurrency(0);
  const totalsDefaultState = useMemo(
    () => ({
      scoops: zeroCurrency,
      toppings: zeroCurrency,
      grandTotal: zeroCurrency,
    }),
    [zeroCurrency]
  );

  const [optionsCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState(totalsDefaultState);
  const [orderPhase, setOrderPhase] = useState(orderPhases.ordering); // 'ORDERING' | 'PAYMENT' | 'COMPLETE'

  const setOrderPhaseFn = (newOrderPhase) => {
    if (orderPhases.hasOwnProperty(newOrderPhase))
      setOrderPhase(orderPhases[newOrderPhase]);
  };

  const resetOrder = useCallback(() => {
    setOptionCounts({
      scoops: new Map(),
      toppings: new Map(),
    });
    setTotals(totalsDefaultState);
    setOrderPhase(orderPhases.ordering);
  }, [totalsDefaultState]);

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
    return [
      { ...optionsCounts, totals, orderPhase },
      updateItemCount,
      setOrderPhaseFn,
      resetOrder,
    ];
  }, [optionsCounts, orderPhase, resetOrder, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
