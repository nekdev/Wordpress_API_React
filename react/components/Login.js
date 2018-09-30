import React, { Component } from "react";
import Consumer from "../components/AppProvider";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
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

class Login extends Component {
  state = {
    user: "",
    password: "",
    open: false,
    mopen: false,
    showPassword: false,
    anchorEl: null
  };

  handleClose = () => {
    this.setState({
      open: false,
      user: "",
      password: "",
      showPassword: false
    });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMClose = () => {
    this.setState({ anchorEl: null });
  };
  handleToggle = () => {
    this.setState(state => ({ mopen: !state.open }));
  };

  render() {
    const { classes } = this.props;
    const { mopen, anchorEl } = this.state;
    return (
      <div>
        {/* <Consumer>
          {context => {
            context.user ? (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            ) : (
              "login"
            );
          }}
        </Consumer> */}
        <div
          color="inherit"
          className={classes.menuLink}
          // onClick={this.handleOpen}
        >
          <Consumer>
            {context => (
              <div>
                {!context.user ? (
                  <Button
                    style={{ color: "#fff" }}
                    onClick={context.handleOpen}
                  >
                    Login
                  </Button>
                ) : (
                  <div>
                    {context.user}
                    <IconButton
                      aria-owns={mopen ? "menu-appbar" : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={Boolean(anchorEl)}
                      onClose={this.handleMClose}
                    >
                      <MenuItem onClick={this.handleMClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleMClose}>My Orders</MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            )}
          </Consumer>
        </div>
        <Consumer>
          {context => {
            return (
              <Dialog
                open={context.formOpen}
                onClose={() => context.handleClose()}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                  <FormControl
                    className={classNames(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="adornment-user">
                      {context.userInputName}
                    </InputLabel>
                    <Input
                      id="adornment-user"
                      type="text"
                      value={this.user}
                      onChange={
                        this.handleChange ? this.handleChange("user") : null
                      }
                    />
                  </FormControl>
                  <FormControl
                    className={classNames(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="adornment-password">
                      {context.userInputPass}
                    </InputLabel>
                    <Input
                      id="adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.password}
                      onChange={
                        this.handleChange ? this.handleChange("password") : null
                      }
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
                <div style={{ textAlign: "center", color: "red" }}>
                  {context.errMsg}
                </div>
                <DialogActions>
                  <Button onClick={() => context.handleClose()} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleRegister} color="primary">
                    register
                  </Button>
                  {/* <Consumer> */}
                  {/* {context => { */}
                  return (
                  <Button
                    color="primary"
                    onClick={() =>
                      context.handleLogin(this.state.user, this.state.password)
                    }
                  >
                    Login
                  </Button>
                  );
                  {/* }} */}
                  {/* </Consumer> */}
                </DialogActions>
              </Dialog>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Login);
