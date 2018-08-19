import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { mapObject } from "../src/helpers";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

const style = {
  root: {
    width: "100%",
    maxWidth: 360,

    position: "relative",
    overflow: "auto",
    maxHeight: "100%"
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  listTitle: {
    backgroundColor: "#efefef"
  },
  modal: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "60%",
    position: "absolute",
    backgroundColor: "#fff",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    padding: "2rem"
  }
};

const MenuItems = props => {
  const classes = styles;
  const checks = (key, value) => {
    if (props.ingredients !== undefined) {
      return (
        <Checkbox
          checked={props.ingredients[value.ingredient_name]}
          disableRipple
          onChange={props.handleIngredientsChange([value.ingredient_name])}
          value={props.ingredients[value[key]]}
        />
      );
    } else {
      return "ok";
    }
  };
  // const checkBoxes = checks();
  return (
    // <div>hello</div>
    <List style={style.root} subheader={<li />}>
      {props.sections.map((sectionItems, index) => (
        <li key={`section-${index}`} style={style.listSection}>
          <ul style={style.ul}>
            <ListSubheader refs={`ref-${index}`} style={style.listTitle}>
              {sectionItems.section_title}
            </ListSubheader>
            {sectionItems.section_items.map((item, index) => (
              <ListItem key={`item-${index}-${item}`} refs={`itemRef-${index}`}>
                {/* {this.logItem(item.extras)} */}
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={
                    !props.open[item.dish_name]
                      ? false
                      : props.open[item.dish_name]
                  }
                  onClose={props.handleModalClose}
                >
                  <div style={style.modal}>
                    <Typography variant="title" id="modal-title">
                      {item.dish_name}
                    </Typography>
                    <Typography variant="subheading" id={item.dish_descriptio}>
                      {item.dish_descriptio}
                    </Typography>
                    <form
                      className={classes.container}
                      noValidate
                      autoComplete="off"
                    >
                      {mapObject(item.ingredients, (key, value) => {
                        return (
                          <ListItem key={key} role={undefined}>
                            <div>{checks(key, value)}</div>
                            {value.ingredient_name}
                          </ListItem>
                        );
                      })}

                      <TextField
                        id="multiline-flexible"
                        label="Special requests"
                        multiline
                        rowsMax="4"
                        value={props.multiline}
                        onChange={props.handleInputChange("multiline")}
                        className={classes.textField}
                        margin="normal"
                      />
                    </form>
                  </div>
                </Modal>

                <ListItemText
                  primary={item.dish_name}
                  secondary={item.dish_descriptio}
                  onClick={() => props.handleModalOpen(item)}
                />
                <Button
                  onClick={() => props.handleModalOpen(item, item.dish_name)}
                >
                  {item.dish_price}€
                </Button>
              </ListItem>
            ))}
            <Divider />
          </ul>
        </li>
      ))}
    </List>
  );
};

MenuItems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuItems);
