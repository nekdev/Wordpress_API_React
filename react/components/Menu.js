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
  marginRight: 15,
  cursor: "pointer"
};

const logoStyle = {
  maxWidth: 250
};

class Menu extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getSlug(url) {
    const parts = url.split("/");
    return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  render() {
    const menuItems = this.props.menu.items.map((item, index) => {
      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      return (
        <NavItem key={index}>
          <Link
            as={`/${item.object}/${slug}`}
            href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          >
            <NavLink style={linkStyle}>{item.title}</NavLink>
          </Link>
        </NavItem>
      );
    });

    return (
      <div>
        <Navbar fixed="top" color="#000" dark expand="md" role="navigation">
          <NavbarBrand href="/">
            <Media
              object
              src="../static/images/logo.svg"
              alt="Orpheus"
              style={logoStyle}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/">
                  <NavLink style={linkStyle}>Home</NavLink>
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
