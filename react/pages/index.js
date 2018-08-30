import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { mapObject } from "../src/helpers";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50
};
const mainStyle = {
  margin: "3rem 8%",
  backgroundColor: "#eeeeee"
};
const styles = {
  card: {
    width: "250px",
    margin: "0.5rem"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  companies: {
    display: "flex",
    flexWrap: "wrap",
    padding: "1rem"
  }
};

class Index extends Component {
  state = {
    open: false
  };
  static async getInitialProps(context) {
    const postsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/companys?_embed`
    );
    const posts = await postsRes.json();

    return { posts };
  }

  render() {
    const posts = this.props.posts.map((post, index) => {
      return (
        <Card style={styles.card} key={index}>
          <CardMedia
            style={styles.media}
            image={post.featured_image_src}
            title={post.title.rendered}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {post.title.rendered}
            </Typography>
            <Typography component="p">{post.excerpt.rendered}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              <Link
                as={`/company?slug=${post.slug}`}
                href={`/company?slug=${post.slug}&apiRoute=post`}
              >
                <a>Order now from {post.title.rendered}</a>
              </Link>
            </Button>
          </CardActions>
        </Card>
      );
    });

    return (
      <Layout>
        <Menu
          open={this.state.open}
          menu={this.props.headerMenu}
          settings={this.props.settings}
          active={this.props.url.asPath}
          pass={this.state.password}
          usr={this.state.user}
        />
        <div className="content" style={mainStyle}>
          <div className="companies" style={styles.companies}>
            {posts}
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Index);
