import Link from "next/link";
import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container } from "reactstrap";

class Companys extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    const companys = this.props.companys.map((company, index) => {
      // console.log(company);
      return (
        <div
          className="blog-items"
          key={index}
          style={{ backgroundImage: `url(${company.acf.header_image})` }}
        >
          <span className="timestamp">{company.date}</span>
          <Link
            as={`/company?slug=${company.slug}`}
            href={`/company?slug=${company.slug}&apiRoute=post`}
          >
            <h3 className="title display-6">
              {company.title.rendered}
              <br />
              <span className="subtitle">{company.excerpt.rendered}</span>
            </h3>
          </Link>
          <p className="lead">{company.acf.blog_text_subtitle}</p>
          <div className="read-more">
            <Link
              as={`/company?slug=${company.slug}`}
              href={`/company?slug=${company.slug}&apiRoute=post`}
            >
              <Button className="btn btn-outline-light btn-sm align-right">
                {company.slug}
              </Button>
            </Link>
          </div>
        </div>
      );
    });

    return (
      <Container className="page-content">
        <div className="blog-posts-container">
          <ul>{companys}</ul>
        </div>
      </Container>
    );
  }
}

export default Companys;
