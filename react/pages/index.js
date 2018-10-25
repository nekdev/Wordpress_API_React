import React from "react";
import Link from "next/link";
import { Config } from "../config.js";
import PageWrapper from "../components/PageWrapper.js";
import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// import ShopList from "../components/ShopList";
import MediaCard from "../components/MediaCard";

import Navigation from "../components/Navigation.js";

const styles = theme => ({
  root: {
    textAlign: "center"
    // paddingTop: theme.spacing.unit * 20
  },
  companies: {
    display: "flex",
    padding: "1rem",
    flexWrap: "nowrap",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },

  mainStyle: {
    margin: "3rem 8%",
    backgroundColor: "#eeeeee"
  },
  button: {
    margin: theme.spacing.unit
  },
  media: {
    height: 240
  },
  grow: {
    flexGrow: 1
  }
});

class Index extends React.Component {
  state = {
    open: false,
    lat: "",
    lon: ""
  };

  static async getInitialProps(context) {
    const postsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/company`);
    const posts = await postsRes.json();
    return { posts };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      });
    });
  }

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

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
  compare = (a, b) => {
    if (a.level < b.level) return -1;
    if (a.level > b.level) return 1;
    return 0;
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const distance = this.props.posts.map(post => {
      post.distance = this.getDistanceFromLatLonInKm(
        this.state.lat,
        this.state.lon,
        post.acf.mapLAt,
        post.acf.mapLong
      );
      return post;
    });
    if (this.state.lat && this.state.lon) {
    }
    const storeInfo = this.props.posts
      .filter(m => m.slug === "menu")
      .map(i => i.acf);

    const posts =
      this.props.posts.code !== "rest_no_route" ? (
        distance
          .filter(menu => menu.slug !== "menu")
          .sort((a, b) => (a.distance > b.distance ? 1 : -1))
          .map((post, index) => (
            // <ShopList
            //   key={index}
            //   list={post}
            //   lat={this.state.lat}
            //   lon={this.state.lon}
            // />
            <MediaCard
              key={index}
              list={post}
              lat={this.state.lat}
              lon={this.state.lon}
            />
          ))
      ) : (
        <h3>Please create posts</h3>
      );

    return (
      <div className={classes.root}>
        <Navigation
          menu={this.props.headerMenu}
          settings={this.props.settings}
        />
        {/* <img src={storeInfo[0].storelogo} alt="new" />
        <div>
          {storeInfo.hasbooking === "1" && (
            <Button size="large" color="primary" className={classes.button}>
              <a
                href={storeInfo.bookingurl}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                BOOK NOW
              </a>
            </Button>
          )}
          <Button color="primary" className={classes.button}>
            CALL NOW
          </Button>

          {storeInfo[0].hasmenu === "1" && (
            <Button size="large" color="primary" className={classes.button}>
              <Link
                prefetch
                as={`/mpiftekakia/menu`}
                href={`/mpiftekakia?slug=menu`}
              >
                <a style={{ color: "inherit", textDecoration: "none" }}>
                  ORDER NOW
                </a>
              </Link>
            </Button>
          )}
        </div>
        <div>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.grow}
          >
            Καλέστε μας στο κατάστημα που εξυπηρετεί
          </Typography>
        </div> */}
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
