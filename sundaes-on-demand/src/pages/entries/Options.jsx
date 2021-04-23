import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./../../constants";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingsOptions";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { useOrderDetails } from "./../../contexts/OrderDetails";
import { pricePerItem } from "./../../constants";

/**
 * @author
 * @function Options
 **/

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();
  useEffect(() => {
    const loadOptions = async () => {
      try {
        let result = await axios.get(`${API}/${optionType}`);
        setItems(result.data);
      } catch (e) {
        setError(true);
      }
    };

    loadOptions();
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;

  const title =
    optionType &&
    optionType.charAt(0).toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      name={item.name}
      key={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each </p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
