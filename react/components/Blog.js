// import React, { Component } from "react";
import Link from "next/link";
import { Button } from "reactstrap";
import { Container } from "reactstrap";

// import bgImage from "../static/images/marketing3.png";
// import bgImage from "../static/images/marketing3.png";

const blogStyle = {
  backgroundImage: `url("../static/images/marketing3.png")`,
  padding: "0% 12% 0% 12%",
  backgroundPosition: "top left",
  backgroundRepeat: "no-repeat"
};
const pageStyle = {
  marginBottom: 10
};

const Blog = props => {
  const blogPosts = props.blogs.map((blogPost, index) => {
    return (
      <div
        className="blog-items"
        key={index}
        style={{ backgroundImage: `url(${blogPost.acf.header_image})` }}
      >
        <span className="timestamp">20-07-2018</span>
        <Link
          as={`/post/${blogPost.slug}`}
          href={`/post?slug=${blogPost.slug}&apiRoute=post`}
        >
          <h3 className="title display-6">
            {blogPost.title.rendered}
            <br />
            <span className="subtitle">{blogPost.excerpt.rendered}</span>
          </h3>
        </Link>
        <p className="lead">{blogPost.acf.blog_text_subtitle}</p>
        <div className="read-more">
          <Link
            as={`/post/${blogPost.slug}`}
            href={`/post?slug=${blogPost.slug}&apiRoute=post`}
          >
            <Button className="btn btn-outline-light btn-sm align-right">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <Container className="page-content">
      <div className="blog-posts-container">
        <ul>{blogPosts}</ul>
      </div>
    </Container>
  );
};

export default Blog;
