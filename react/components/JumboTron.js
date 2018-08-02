import React from "react";
import Link from "next/link";
import { Jumbotron, Button } from "reactstrap";

const TextRotate = require("react-rotating-text");

const JumboTron = () => {
  return (
    <Jumbotron fluid className="table">
      <h2
        className="display-4 text-uppercase text-center table-cell"
        data-type="content"
      >
        CONCEPT SHOP <br />
        <span className="text-center creative mb-5 text-uppercase">
          MARKETING & ADVERTISING
        </span>
        <div>
          <span className="creative txt-rotate text-uppercase">
            <TextRotate
              items={[
                "strategy",
                "media",
                "solutions",
                "branding",
                "research",
                "responsibility"
              ]}
            />
          </span>
        </div>
        <p className="lead">
          <Link as={`/page/concept`} href={`/post?slug=about&apiRoute=page`}>
            <Button className="btn btn-outline-light btn-lg mt-5 bt-enter">
              FIND OUT MORE
            </Button>
          </Link>
        </p>
      </h2>
    </Jumbotron>
  );
};

export default JumboTron;
