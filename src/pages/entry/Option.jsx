import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../context/orderDetails";
import { formatCurrency } from '../../utilities'

const Options = ({ OptionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${OptionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => setError(true));
  }, [OptionType]);

  if (error) {
    // console.log("Errror occurred for " + OptionType);
    return <AlertBanner key={`alertFor${OptionType}`} />;
  }

  const ItemComponent =
    OptionType === "scoops"
      ? ScoopOptions
      : OptionType === "toppings"
      ? ToppingOptions
      : null;

  const Title = OptionType[0].toUpperCase() + OptionType.slice(1).toLowerCase();

  const OptionsItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, itemCount) =>
        updateItemCount(itemName, itemCount, OptionType)
      }
    />
  ));
  
  return (
    <>
      <h2>{Title}</h2>
      <p>{formatCurrency(pricePerItem[OptionType])} each</p>
      <p>
        {Title} total: {orderDetails.totals[OptionType]}
      </p>
      <Row>{OptionsItems}</Row>
    </>
  );
};

export default Options;
