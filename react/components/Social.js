import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import { Config } from "../config.js";
import { mapObject } from "../src/helpers";

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
    const socials = this.state.data;
    return (
      <div className="footer-socials">
        <ul className="social-links">
          {mapObject(socials, (key, value) => {
            return (
              <li key={key}>
                <a
                  className="social-link"
                  href={`https://www.${key}.com/${value}`}
                  target="_blank"
                  aria-label={`fa fa-${key}`}
                >
                  <span
                    className="simple-svg"
                    data-icon={`simple-line-icons:social-${key}`}
                    data-inline="false"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Social;
