import React from "react";
import { Config } from "../config.js";
import { AppProvider } from "./AppProvider";
import jsCookie from "js-cookie";

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      //get wp menu
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const headerMenu = await headerMenuRes.json();
      //get theme settings
      const settingsRes = await fetch(
        `${Config.apiUrl}/wp-json/orpheus/v1/settings`
      );
      const settings = await settingsRes.json();
      // check for cookies
      const cookies = jsCookie.get("token");
      const userId = jsCookie.get("userId");

      const data = { token: cookies, userId: userId };
      const userData = await fetch(`${Config.apiUrl}/wp-json/orpheus/v1/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          const auth = myJson;

          return auth;
        });

      return {
        headerMenu,
        userData,
        settings,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
      };
    }

    render() {
      return (
        <AppProvider>
          <Comp {...this.props} />
        </AppProvider>
      );
    }
  };

export default PageWrapper;
