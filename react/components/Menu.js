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
  NavLink
} from "reactstrap";

const linkStyle = {
  marginRight: 15,
  cursor: "pointer"
};

class Menu extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getSlug(url) {
    const parts = url.split("/");
    return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  render() {
    const menuItems = this.props.menu.items.map((item, index) => {
      if (item.object === "custom") {
        return (
          <Link href={item.url} key={item.ID}>
            <a style={linkStyle}>{item.title}</a>
          </Link>
        );
      }
      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      return (
        <NavItem key={item.ID}>
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
        <Navbar color="dark" dark expand="md" role="navigation">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
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
