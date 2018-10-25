import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Phone from "@material-ui/icons/Phone";
import IconButton from "@material-ui/core/IconButton";
import NearMe from "@material-ui/icons/NearMe";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 560
    // backgroundColor: theme.palette.background.paper
  },
  listItem: {
    backgroundColor: "#45df9d",
    marginBottom: 5
  }
});

class ShopList extends React.Component {
  render() {
    const { classes } = this.props;
    // console.log(this.props.list);
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            role={undefined}
            dense
            button
            //   onClick={this.handleToggle(value)}
            className={classes.listItem}
          >
            <div>
              {/* <Tooltip
                title={this.props.list.acf.map_long_lat.address}
                placement="top"
              > */}
              <IconButton aria-label="call">
                <a
                  style={{ color: "inherit" }}
                  href={`https://www.google.com/maps/place/${
                    this.props.list.acf.mapLAt
                  }+${this.props.list.acf.mapLong}/${
                    this.props.list.acf.mapLAt
                  },${this.props.list.acf.mapLong},15.21z?hl=el`}
                  target="_blank"
                >
                  <NearMe />
                </a>
              </IconButton>
              {/* </Tooltip> */}
            </div>

            <ListItemText
              style={{ textAlign: "center" }}
              primary={this.props.list.title.rendered}
            />

            <div>
              <Tooltip title={this.props.list.acf.phone_number} placement="top">
                <IconButton aria-label="Call">
                  <a
                    style={{ color: "inherit" }}
                    href={`tel:${this.props.list.acf.phone_number}`}
                  >
                    <Phone />
                  </a>
                </IconButton>
              </Tooltip>
            </div>
          </ListItem>
        </List>
      </div>
    );
  }
}

ShopList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShopList);
