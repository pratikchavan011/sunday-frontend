import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

const Options = ({ OptionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${OptionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => setError(true));
  }, [OptionType]);

  if(error){
    console.log('Errror occurred for '+OptionType);
    return <AlertBanner key={`alertFor${OptionType}`} />
  }

  const ItemComponent =
    OptionType === "scoops"
      ? ScoopOptions
      : OptionType === "toppings"
      ? ToppingOptions
      : null;

  const OptionsItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{OptionsItems}</Row>;
};

export default Options;
