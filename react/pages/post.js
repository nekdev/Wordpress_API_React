import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import Blog from "../components/Blog";
import { Config } from "../config.js";
import { Container } from "reactstrap";
import HeaderImage from "../components/HeaderImage";
import Contact from "../components/Contact";

const blogStyle = {
  backgroundImage: `url("../static/images/marketing3.png")`,
  padding: "0% 12% 0% 12%",
  backgroundPosition: "top left",
  backgroundRepeat: "no-repeat"
};
const pageStyle = {
  marginBottom: 10
};

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const postsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed`);
    const blogPosts = await postsRes.json();
    const res = await fetch(
      `${Config.apiUrl}/wp-json/orpheus/v1/${apiRoute}?slug=${slug}`
    );
    const post = await res.json();
    const apiroute = apiRoute;
    return { blogPosts, post, apiroute };
  }

  render() {
    if (!this.props.post.title) return <Error statusCode={404} />;
    // const apiRoute = this.props.apiroute;
    if (this.props.url.asPath === "/page/blog") {
      const blogPosts = this.props.blogPosts;
      return (
        <Layout>
          <Menu
            menu={this.props.headerMenu}
            settings={this.props.settings}
            active={this.props.url.asPath}
          />
          <HeaderImage headerImage={this.props.post} />
          <Blog blogs={blogPosts} />
        </Layout>
      );
    } else if (this.props.url.asPath === "/page/contact") {
      return (
        <Layout>
          <Menu
            menu={this.props.headerMenu}
            settings={this.props.settings}
            active={this.props.url.asPath}
          />
          <HeaderImage headerImage={this.props.post} />
          <Contact />
        </Layout>
      );
    } else if (this.props.apiroute === "post") {
      return (
        <Layout>
          <Menu
            menu={this.props.headerMenu}
            settings={this.props.settings}
            active={this.props.url.asPath}
          />
          <HeaderImage headerImage={this.props.post} />
          <Container
            className="page-content"
            style={blogStyle}
            dangerouslySetInnerHTML={{
              __html: this.props.post.content.rendered
            }}
          />
        </Layout>
      );
    } else {
      return (
        <Layout>
          <Menu
            menu={this.props.headerMenu}
            settings={this.props.settings}
            active={this.props.url.asPath}
          />
          <HeaderImage headerImage={this.props.post} />
          <Container
            className="page-content"
            style={pageStyle}
            dangerouslySetInnerHTML={{
              __html: this.props.post.content.rendered
            }}
          />
        </Layout>
      );
    }
  }
}

export default PageWrapper(Post);
