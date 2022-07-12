import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOptions from "./scoopOptions";
import ToppingOptions from "./ToppingOptions";

const Options = ({ OptionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${OptionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log("API FAILED!!!"));
  }, [OptionType]);

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
