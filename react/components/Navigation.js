import React from "react";
import Link from "next/link";
import Consumer from "../components/AppProvider";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Login from "./Login";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  popper: {
    zIndex: 3
  }
};

class Navigation extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    open: false
  };
  getSlug(url) {
    const parts = url.split("/");
    return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleWpClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const menuItems = this.props.menu.items.map(item => {
      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      return (
        <MenuItem key={item.ID} onClick={this.handleWpClose}>
          <Link
            as={`/${item.object}/${slug}`}
            href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          >
            <a>{item.title}</a>
          </Link>
        </MenuItem>
      );
    });

    return (
      <div className={classes.root}>
        <AppBar
          position={
            this.props.settings.sticky === ""
              ? "static"
              : this.props.settings.sticky
          }
        >
          <Toolbar>
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              <MenuIcon />
            </Button>

            <Popper
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              className={classes.popper}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleWpClose}>
                      <MenuList>
                        <MenuItem onClick={this.handleWpClose}>
                          <Link href={"/"}>
                            <a className={classes.menuLink}>Home</a>
                          </Link>
                        </MenuItem>
                        {menuItems}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            <Link href={"/"}>
              <a className={classes.menuLink}>
                <div style={{ margin: "auto" }}>
                  <img
                    style={{
                      width: this.props.settings.logoSize,
                      marginRight: "10px"
                    }}
                    src={this.props.settings.logo}
                  />
                </div>
              </a>
            </Link>

            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              {this.props.settings.site_title}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Login />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
