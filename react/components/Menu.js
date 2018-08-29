import React, { Component } from "react";
import Link from "next/link";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuIcon from "@material-ui/icons/Menu";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const drawerWidth = 240;
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: `${top}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
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
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  linkStyle: {
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});

class Menu extends Component {
  state = {
    open: false,
    showPassword: false
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
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      user: "",
      password: "",
      showPassword: false
    });
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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
              <Button color="inherit" onClick={this.handleOpen}>
                Login {this.props.hello}
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                  <FormControl
                    className={classNames(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="adornment-user">User Name</InputLabel>
                    <Input
                      id="adornment-user"
                      type="text"
                      value={this.props.user}
                      onChange={this.props.handleInputChange("user")}
                    />
                  </FormControl>
                  <FormControl
                    className={classNames(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.props.password}
                      onChange={this.props.handleInputChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
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
