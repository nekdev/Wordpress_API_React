import React, { Component } from "react";
import Link from "next/link";
import { Config } from "../config.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navItem: {
    borderBottom: "2px solid #fff"
  }
};
const linkStyle = {
  textTransform: "uppercase",
  cursor: "pointer",
  textDecoration: "none",
  color: "#fff"
};

class Menu extends Component {
  navRef = React.createRef();

  state = {
    isOpen: false,
    isSticky: "fixed-top"
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getSlug(url) {
    const parts = url.split("/");
    return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  render() {
    const st = styles;
    let classes = null;
    const menuItems = this.props.menu.items.map((item, index) => {
      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      const activePage = "/" + item.object + "/" + slug;
      const active = this.props.active === activePage ? "active" : "";
      ("use strict");
      classes = `${active} hvr-underline-from-center`;

      return (
        <Button
          stule={st.navitem}
          key={item.ID}
          className={classes}
          menuid={item.ID}
        >
          <Link
            as={`/${item.object}/${slug}`}
            href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          >
            <a style={linkStyle} className="navbar-link">
              {item.title}
            </a>
          </Link>
        </Button>
      );
    });
    const indexClass = `${
      this.props.active === "/" ? "active" : ""
    } hvr-underline-from-center`;
    return (
      <div id="navigation" ref={this.navRef} styles={styles.root}>
        <AppBar
          position={
            this.props.settings.sticky === ""
              ? "static"
              : this.props.settings.sticky
          }
        >
          <Toolbar>
            {/* <IconButton
              styles={styles.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton> */}
            <div>
              <img
                style={{ maxWidth: this.props.settings.logoSize }}
                src={this.props.settings.logo}
              />
            </div>
            <nav>
              <Button className={indexClass}>
                <Link href={"/"}>
                  <a style={linkStyle} className="navbar-link">
                    Home
                  </a>
                </Link>
              </Button>
              {/* {menuItems} */}
            </nav>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Menu;
