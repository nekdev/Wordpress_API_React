import React, { Component } from "react";
import Link from "next/link";
import { Config } from "../config.js";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Media
} from "reactstrap";

const linkStyle = {
  textTransform: "uppercase",
  cursor: "pointer"
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
    let classes = null;
    const menuItems = this.props.menu.items.map((item, index) => {
      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      const activePage = "/" + item.object + "/" + slug;
      const active = this.props.active === activePage ? "active" : "";
      ("use strict");
      classes = `${active} hvr-underline-from-center`;

      return (
        <NavItem key={item.ID}>
          <Link
            as={`/${item.object}/${slug}`}
            href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          >
            <NavLink className={classes} menuid={item.ID} style={linkStyle}>
              {item.title}
            </NavLink>
          </Link>
        </NavItem>
      );
    });
    const indexClass = `${
      this.props.active === "/" ? "active" : ""
    } hvr-underline-from-center`;
    return (
      <div id="navigation" ref={this.navRef}>
        <Navbar
          className={this.state.isSticky}
          onScroll={this.handleScroll}
          color="#000"
          dark
          expand="md"
          role="navigation"
        >
          <NavbarBrand href="/">
            <Media
              object
              src={this.props.settings.logo}
              alt="Orpheus"
              style={{ maxWidth: this.props.settings.logoSize }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/">
                  <NavLink className={indexClass} style={linkStyle}>
                    Home
                  </NavLink>
                </Link>
              </NavItem>
              {menuItems}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Menu;
