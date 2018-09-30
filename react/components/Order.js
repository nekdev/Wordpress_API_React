import React from "react";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
