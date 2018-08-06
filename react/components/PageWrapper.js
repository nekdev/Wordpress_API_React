import React from "react";
import { Config } from "../config.js";

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const headerMenu = await headerMenuRes.json();
      //get theme settings
      const settingsRes = await fetch(
        `${Config.apiUrl}/wp-json/orpheus/v1/settings`
      );
      const settings = await settingsRes.json();

      return {
        headerMenu,
        settings,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
