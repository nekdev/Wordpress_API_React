import React from "react";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { mapObject } from "../src/helpers";

const Order = props => {
  const { name, price, quantity, extras, ingredients } = props.details;

  return (
    <div>
      <ListItem>
        <ListItemText primary={name} secondary={price + "€"} />
        {quantity}
      </ListItem>
      <Divider />
    </div>
  );
};

export default Order;
