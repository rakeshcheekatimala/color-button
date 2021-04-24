import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "./../constants";
import { formatCurrency } from "./../utilities";

const OrderDetails = createContext();

// create custom hook to check whether we are inside a provider

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used with in OrderDetails Provider"
    );
  }
  return context;
}

function calculateSubTotal(optionType, optionsCount) {
  let totalCount = 0;
  for (const count of optionsCount[optionType].values()) {
    totalCount += count;
  }
  return totalCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionsCount, setOptionsCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal("scoops", optionsCount);
    const toppingsSubTotal = calculateSubTotal("toppings", optionsCount);
    const grandTotal = formatCurrency(scoopsSubTotal + toppingsSubTotal);
    setTotals({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal,
    });
  }, [optionsCount]);

  const value = useMemo(() => {
    // getter: internal state of object which is scoops, toppings,
    // setter: update optionCount
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionsCount };

      // update option count for this item with the new value
      const optionCountsMap = optionsCount[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionsCount(newOptionCounts);
    }

    function resetOrder() {
      setOptionsCount({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    return [{ ...optionsCount, totals }, updateItemCount, resetOrder];
  }, [optionsCount, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
