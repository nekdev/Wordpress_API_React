import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Call from "@material-ui/icons/Call";

const styles = {
  media: {
    height: 140
  },
  card: {
    maxWidth: 300,
    minWidth: 280
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  extendedIcon: {
    marginRight: 5
  },
  atag: {
    color: "inherit",
    textDecoration: "inherit",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

function MediaCard(props) {
  const { classes } = props;
  console.log(props);
  return (
    <Card className={classes.card}>
      {props.list.featured_image_src !== "" && (
        <CardMedia
          className={classes.media}
          image={props.list.featured_image_src}
          title={props.list.title.rendered}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4">
          {props.list.title.rendered}
        </Typography>
        <Typography component="p">{props.list.acf.description}</Typography>
      </CardContent>
      <CardActions className={classes.actionButtons}>
        <a style={{ color: "inherit" }} href={`tel:${props.list.acf.phone}`}>
          <Button
            variant="extendedFab"
            aria-label="Call"
            color="primary"
            className={classes.button}
          >
            <Call className={classes.extendedIcon} />
          </Button>
        </a>
        <Button
          variant="extendedFab"
          aria-label="Order"
          color="primary"
          className={classes.button}
        >
          <Link
            as={`/book/${props.list.slug}`}
            href={`/book?slug=${props.list.slug}&apiRoute=post`}
          >
            <a className={classes.atag}>Book</a>
          </Link>
        </Button>
        <Button
          variant="extendedFab"
          aria-label="Order"
          color="primary"
          className={classes.button}
        >
          <Link
            as={`/company/${props.list.slug}`}
            href={`/company?slug=${props.list.slug}&apiRoute=post`}
          >
            <a className={classes.atag}>Order</a>
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
