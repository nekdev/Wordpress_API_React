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
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import { mapObject } from "../src/helpers";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
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
    height: "auto",
    position: "absolute",
    backgroundColor: "#fff",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    padding: "2rem"
  },
  checkBoxes: {
    justifyContent: "space-around"
  },
  checkBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  listings: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  numField: {
    width: "3rem",
    textAlign: "center"
  },
  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }
};

const MenuItems = props => {
  const classes = styles;
  const checks = (key, value, field, field_name, handler) => {
    if (field !== undefined) {
      return (
        <Checkbox
          checked={field[field_name]}
          disableRipple
          onChange={handler([field_name])}
          value={field[value[key]]}
        />
      );
    }
  };
  return (
    <List style={style.root} subheader={<li />}>
      {props.sections.map((sectionItems, index) => (
        <li key={`section-${index}`} style={style.listSection}>
          <ul style={style.ul}>
            <ListSubheader refs={`ref-${index}`} style={style.listTitle}>
              {sectionItems.section_title}
            </ListSubheader>
            {sectionItems.section_items.map(item => (
              <ListItem
                key={`item-${item.dish_name}`}
                refs={`itemRef-${item.dish_name}`}
              >
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  disableBackdropClick={true}
                  open={
                    !props.open[item.dish_name]
                      ? false
                      : props.open[item.dish_name]
                  }
                  onClose={props.handleModalClose}
                >
                  <div style={style.modal}>
                    <Typography variant="title" id="modal-title">
                      {item.dish_name + " " + item.dish_price + "€"}
                    </Typography>
                    <Typography variant="subheading" id={item.dish_descriptio}>
                      {item.dish_descriptio}
                    </Typography>
                    <div className={classes.container}>
                      <div className={classes.root}>
                        {item.ingredients ? (
                          <ExpansionPanel defaultExpanded={true}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography className={classes.heading}>
                                Ingredients
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={style.checkBoxes}>
                              {mapObject(item.ingredients, (key, value) => {
                                return (
                                  <div key={key} style={style.checkBox}>
                                    {checks(
                                      key,
                                      value,
                                      props.ingredients,
                                      value.ingredient_name,
                                      props.handleIngredientsChange
                                    )}
                                    {value.ingredient_name}
                                  </div>
                                );
                              })}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        ) : (
                          ""
                        )}
                        {item.extra ? (
                          <ExpansionPanel style={style.checkBoxes}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography className={classes.heading}>
                                Extras
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={style.checkBoxes}>
                              {mapObject(item.extra, (key, value) => {
                                const priceFormated =
                                  value.extra_price !== ""
                                    ? value.extra_price + "€"
                                    : null;
                                return (
                                  <div key={key} style={style.checkBox}>
                                    {checks(
                                      key,
                                      value,
                                      props.extra,
                                      value.extra_name,
                                      props.handleExtraChange
                                    )}
                                    {value.extra_name} {priceFormated}
                                  </div>
                                );
                              })}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        ) : (
                          ""
                        )}

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
                      </div>
                      <Divider />
                      <div style={style.modalFooter}>
                        <div>
                          <Button size="small" onClick={props.quantityMinus}>
                            -
                          </Button>
                          <TextField
                            id="number"
                            label="Quantity"
                            value={props.quantity}
                            onChange={props.handleInputChange("quantity")}
                            type="number"
                            style={style.numField}
                            InputLabelProps={{
                              shrink: true
                            }}
                            margin="normal"
                          />
                          <Button
                            size="small"
                            color="primary"
                            onClick={props.quantityPlus}
                          >
                            +
                          </Button>
                        </div>
                        <div>
                          <Button size="small" onClick={props.handleModalClose}>
                            Cancel
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => props.addToOrder(item)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div style={style.listings}>
                  <ListItemText
                    primary={item.dish_name}
                    secondary={item.dish_descriptio}
                    onClick={() => props.handleModalOpen(item)}
                  />
                  <Button onClick={() => props.handleModalOpen(item)}>
                    {item.dish_price}€
                  </Button>
                  <Divider />
                </div>
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
