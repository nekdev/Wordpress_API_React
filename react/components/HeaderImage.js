import React from "react";
import { Jumbotron } from "reactstrap";

const HeaderImage = props => {
  return (
    <Jumbotron
      className="header_image table"
      style={{
        backgroundImage: "url(" + props.headerImage.acf.header_image + " ) "
      }}
    >
      <h2 className="display-5 text-uppercase table-cell" data-type="content">
        {props.headerImage.title.rendered} <br />
      </h2>
    </Jumbotron>
  );
};

export default HeaderImage;
