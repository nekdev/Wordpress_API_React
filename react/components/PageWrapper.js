import React from "react";
import { Config } from "../config.js";
import ReactLoading from "react-loading";
const styles = {
  width: "100%",
  height: "30rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
const PageWrapper = Comp =>
  class extends React.Component {
    state = {
      loading: true
    };
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
    componentDidMount() {
      setTimeout(() => this.setState({ loading: false }), 300); // simulates an async action, and hides the spinner
    }
    render() {
      const loading = () => (
        <ReactLoading type="spin" color="blue" height={"3%"} width={"3%"} />
      );
      const load = loading();
      if (this.state.loading) {
        // if your component doesn't have to wait for an async action, remove this block
        return <div style={styles}>{load}</div>;
      }
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
