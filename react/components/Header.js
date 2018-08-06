import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Menu from "./Menu.js";
import { Config } from "../config.js";
// import registerServiceWorker from "react-service-worker";
import stylesheet from "../src/styles/style.scss";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>Concept Shop Marketing</title>
          <meta name="theme-color" content="#181818" />
          <link rel="apple-touch-icon" href="/static/images/logo_concept.png" />
          <meta name="apple-mobile-web-app-title" content="Concept Shop" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="static/manifest.json" />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
      </div>
    );
  }
}

export default Header;
