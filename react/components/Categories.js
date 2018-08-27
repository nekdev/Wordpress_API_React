import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
const drawerWidth = 240;

const styles = theme => ({
  sections: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    textAlign: "right"
  }
});
const Categories = props => {
  const { classes } = props;
  return (
    <List className={classes.sections}>{props.categories.section_title} </List>
  );
};
Categories.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Categories);
