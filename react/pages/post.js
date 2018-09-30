import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import Navigation from "../components/Navigation.js";

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/orpheus/v1/${apiRoute}?slug=${slug}`
    );
    const post = await res.json();
    return { post };
  }

  render() {
    if (!this.props.post.title) return <Error statusCode={404} />;

    return (
      <div>
        <Navigation
          menu={this.props.headerMenu}
          settings={this.props.settings}
        />
        <h1>{this.props.post.title.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.post.content.rendered
          }}
        />
      </div>
    );
  }
}

export default PageWrapper(Post);
