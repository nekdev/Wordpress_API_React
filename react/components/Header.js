import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Menu from "./Menu.js";
import { Config } from "../config.js";
import stylesheet from "../src/styles/style.scss";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css"
            integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B"
            crossorigin="anonymous"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>WordPress + React Starter Kit Frontend by Postlight</title>
        </Head>
      </div>
    );
  }
}

export default Header;
