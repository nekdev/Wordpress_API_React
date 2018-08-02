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
  // getSocials(obj) {
  //   var tifOptions = Object.keys(tifs).map(function(key) {
  //     return <option value={key}>{tifs[key]}</option>
  // });
  // for (let i in obj) {
  //   console.log("Key: " + i + " Value: " + obj[i]);
  // if (obj[i] !== null && obj[i] != "") {
  //   Object.keys(obj).map(
  //     i => (
  //       // console.log("Key: " + i + " Value: " + obj[i]);
  //       <a
  //         className="social-link"
  //         href={`https://www.${i}.com/${obj[i]}`}
  //         target="_blank"
  //         aria-label={`fa fa-${i}`}
  //       >
  //         <span
  //           className="simple-svg"
  //           data-icon={`simple-line-icons:social-${i}`}
  //           data-inline="false"
  //         />
  //       </a>
  //     )

  //     // }
  //   );
  // }
  mapObject(object, callback) {
    return Object.keys(object).map(function(key) {
      if (object[key] !== null && object[key] != "") {
        return callback(key, object[key]);
      }
    });
  }
  render() {
    //map throu data object and extract key and value
    // console.log(this.state.data.facebook);
    // const socials = () => {
    //   for (let i in this.state.data) {
    //     console.log("Key: " + i + " Value: " + this.state.data[i]);
    //     if (this.state.data[i] !== null && this.state.data[i] != "") {
    //       return (
    //         <li>
    //           <a
    //             className="social-link"
    //             href={`https://www.${i}.com/${this.state.data[i]}`}
    //             target="_blank"
    //             aria-label={`fa fa-${i}`}
    //           >
    //             <span
    //               className="simple-svg"
    //               data-icon={`simple-line-icons:social-${i}`}
    //               data-inline="false"
    //             />
    //           </a>
    //         </li>
    //       );
    //     }
    //   }
    // };
    const socials = this.state.data;
    return (
      <div className="footer-socials">
        <ul className="social-links">
          {this.mapObject(socials, function(key, value) {
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
