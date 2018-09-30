import React, { Component, createContext } from "react";
import { Config } from "../config";
import jsCookie from "js-cookie";
const { Provider, Consumer } = createContext();

//get theme settings

// Then create a provider Component
class AppProvider extends Component {
  state = {
    userLoggedIn: true,
    errMsg: "",
    userInputName: "User Name",
    userInputPass: "Password",
    profile: {
      username: "",
      userEmail: "",
      nonce: ""
    },
    toggleLogin: () => {
      const setTo = !this.state.userLoggedIn;
      this.setState({ userLoggedIn: setTo });
    },
    formOpen: false
  };

  render() {
    return (
      <Provider
        value={{
          user: this.state.profile.username,
          notOpen: this.state.notOpen,
          isLoggedIn: this.state.userLoggedIn,
          formOpen: this.state.formOpen,
          userInputName: this.state.userInputName,
          errMsg: this.state.errMsg,
          userInputPass: this.state.userInputPass,
          handleOpen: () => {
            this.setState({ formOpen: true });
          },
          handleClose: () => {
            this.setState({ formOpen: false });
          },
          handleLogin: (usr, pass) => {
            if (usr === "" || pass === "") {
              this.setState({
                errMsg: "No empty fields please!"
              });
              window.setTimeout(() => {
                this.setState({
                  errMsg: null
                });
              }, 4000);
            } else {
              const data = {
                username: usr,
                password: pass
              };
              fetch(`${Config.apiUrl}/wp-json/orpheus/v1/login`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              })
                .then(response => {
                  return response.json();
                })
                .then(myJson => {
                  if (
                    typeof myJson !== "object" &&
                    myJson.includes("Invalid username")
                  ) {
                    this.setState({
                      userInputName: "Invalid username",
                      errMsg: "Your Username is invalid"
                    });
                    window.setTimeout(() => {
                      this.setState({
                        errMsg: null
                      });
                    }, 4000);
                  } else if (
                    typeof myJson !== "object" &&
                    myJson.includes("The password you entered for the username")
                  ) {
                    this.setState({
                      userInputPass: "Invalid Password",
                      errMsg: "Your Password is invalid"
                    });
                    window.setTimeout(() => {
                      this.setState({
                        errMsg: null
                      });
                    }, 4000);
                  } else {
                    this.setState({
                      profile: {
                        username: myJson.user.data.user_nicename,
                        userEmail: myJson.user.data.user_email,
                        nonce: myJson.nonce
                      },
                      userLoggedIn: true,
                      notOpen: true,
                      formOpen: false
                    });
                    jsCookie.set("token", myJson.nonce);
                  }
                });
            }
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
export { AppProvider };

export default Consumer;
