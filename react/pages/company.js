import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Config } from "../config.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import MenuItems from "../components/MenuItems";
import { arrayToObject } from "../src/helpers";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 550,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.secondary.light,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  menuItems: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
    height: 550
  },
  sections: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    textAlign: "right"
  }
});

class Company extends Component {
  state = {
    menu: [],
    categories: [],
    width: null,
    left: false,
    tabValue: 0,
    hidden: "",
    open: [],
    mobileOpen: false,
    multiline: "",
    ingredients: {
      name: []
    }
  };
  static async getInitialProps(context) {
    const { slug } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/orpheus/v1/company?slug=${slug}`
    );
    const post = await res.json();
    return { post };
  }

  componentDidMount = () => {
    this.setState({ menu: this.props.post.acf.menu_sections });
  };
  handleTabChange = (e, tabValue) => {
    e.preventDefault();
    this.setState({ tabValue });
  };
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleIngredientsChange = name => event => {
    const ingredients = { ...this.state.ingredients };

    //check if exisests in state then add if not
    this.setState({
      ingredients: {
        ...this.state.ingredients,
        [name]: event.target.checked
      }
    });
  };
  handleModalOpen = item => {
    if (item.ingredients.length > 0) {
      const ingObj = item.ingredients.map(v => {
        const val = v.ingredient_name;
        return val;
      });
      var obj = ingObj.reduce((acc, cur, i) => {
        i = cur;
        acc[i] = "true";
        return acc;
      }, {});
    }

    this.setState({
      open: {
        [item.dish_name]: true
      },
      ingredients: obj
    });
  };

  handleModalClose = item => {
    this.setState({
      open: false,
      ingredients: []
    });
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, theme } = this.props;
    const hide = this.state.hidden;
    const { tabValue } = this.state;
    const categories = this.state.menu.map((category, index) => {
      return (
        <div key={index}>
          <List className={classes.sections}>{category.section_title} </List>
          <Divider />
        </div>
      );
    });

    if (!this.props.post.title) return <Error statusCode={404} />;
    const comp = this.props.post;
    // const newMenu = menu();
    // console.log(this);
    return (
      <Layout>
        <Menu
          menu={this.props.headerMenu}
          settings={this.props.settings}
          active={this.props.url.asPath}
        />

        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                <Tabs
                  value={tabValue}
                  onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Menu" />
                  <Tab label="Info" />
                  <Tab label="Reviews" />
                  <Tab label="My orders" href="#basic-tabs" />
                </Tabs>
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {categories}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {categories}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            {tabValue === 0 && (
              <div className={classes.menuItems}>
                <MenuItems
                  sections={this.state.menu}
                  ingredients={this.state.ingredients}
                  handleInputChange={this.handleInputChange}
                  multiline={this.state.multiline}
                  handleIngredientsChange={this.handleIngredientsChange}
                  handleModalOpen={this.handleModalOpen}
                  handleModalClose={this.handleModalClose}
                  open={this.state.open}
                />
              </div>
            )}
            {tabValue === 1 && <div>Company info</div>}
            {tabValue === 2 && <div>Reviews</div>}
            {tabValue === 3 && <div>My orders</div>}
          </main>
        </div>
      </Layout>
    );
  }
}
Company.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default PageWrapper(withStyles(styles, { withTheme: true })(Company));
