import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const styles = theme => ({
  rootBar: {
    flexGrow: 1
  },

  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  linkStyle: {
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff"
  }
});

class Menu extends Component {
  state = {
    mobileOpen: false
  };

  getSlug(url) {
    const parts = url.split("/");
    return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    // let classes = null;
    const menuItems = this.props.menu.items.map((item, index) => {
      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      const activePage = "/" + item.object + "/" + slug;
      const active = this.props.active === activePage ? "active" : "";
      // ("use strict");
      // classes = `${active} hvr-underline-from-center`;

      return (
        <Button
          // stule={st.navitem}
          key={item.ID}
          // className={active}
          menuid={item.ID}
        >
          <Link
            as={`/${item.object}/${slug}`}
            href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          >
            <a className={classes.linkStyle}>{item.title}</a>
          </Link>
        </Button>
      );
    });
    const indexClass = `${
      this.props.active === "/" ? "active" : ""
    } hvr-underline-from-center`;
    return (
      <div className={classes.rootBar}>
        <AppBar
          position={
            this.props.settings.sticky === ""
              ? "static"
              : this.props.settings.sticky
          }
        >
          <Toolbar className={classes.toolBar}>
            <div className={classes.toolBar}>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <div>
                <img
                  style={{ maxWidth: this.props.settings.logoSize }}
                  src={this.props.settings.logo}
                />
              </div>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Delivery
              </Typography>
            </div>
            <div>
              <Button className={indexClass}>
                <Link href={"/"}>
                  <a className={classes.linkStyle}>Home</a>
                </Link>
              </Button>
              {menuItems}
              <Button color="inherit">Login</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
