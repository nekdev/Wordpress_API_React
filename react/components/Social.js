import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import JumboTron from "../components/JumboTron";
import { Config } from "../config.js";
import { Container } from "reactstrap";

class Social extends Component {
  state = {
    data: []
  };
  componentWillMount() {
    fetch(`${Config.apiUrl}/wp-json/orpheus/v1/social`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
      });
  }

  render() {
    //map throu data object and extract key and value
    // console.log(this.state.data.facebook);

    return (
      <div className="footer-socials">
        <ul className="social-links">
          <li>
            <a
              className="social-link"
              href="https://www.'.$key.'.com/'.$value.'"
              target="_blank"
              aria-label="fa fa-'.$key.'"
            >
              <span
                className="simple-svg"
                data-icon="simple-line-icons:social-'.$key.'"
                data-inline="false"
              >
                {/* {this.state.data.facebook} */}
              </span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Social;
