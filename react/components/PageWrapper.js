import React from "react";
import { Config } from "../config.js";

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const headerMenu = await headerMenuRes.json();
      // const mediaRes = await fetch(
      //   `${Config.apiUrl}/wp-json/wp/v2/media?_embed`
      // );
      // const media = await mediaRes.json();
      // const logo = media.find(log => {
      //   return log.slug == "logo";
      // });
      return {
        headerMenu,
        // logo,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
