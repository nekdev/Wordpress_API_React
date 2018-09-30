/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { Config } from "../config.js";
import PageWrapper from "../components/PageWrapper.js";
import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";

import Navigation from "../components/Navigation.js";

const styles = theme => ({
  root: {
    textAlign: "center"
    // paddingTop: theme.spacing.unit * 20
  },
  companies: {
    display: "flex",
    flexWrap: "wrap",
    padding: "1rem"
  },
  mainStyle: {
    margin: "3rem 8%",
    backgroundColor: "#eeeeee"
  },
  card: {
    width: 330,
    margin: "3rem"
  },
  media: {
    height: 240
  }
});

class Index extends React.Component {
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

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  render() {
    // console.log(this.props);
    const { classes } = this.props;
    const { open } = this.state;
    const posts = this.props.posts.map((post, index) => {
      return (
        <Card className={classes.card} key={index}>
          <CardMedia
            className={classes.media}
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
                as={`/company/${post.slug}`}
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
      <div className={classes.root}>
        <Navigation
          menu={this.props.headerMenu}
          settings={this.props.settings}
        />

        <div className={classes.mainStyle}>
          <div className={classes.companies}>{posts}</div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default PageWrapper(withStyles(styles)(Index));
