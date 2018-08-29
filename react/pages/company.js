import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
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
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Order from "../components/Order";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: "100%",
    transform: `translate(-${top}%, -${left}%)`
  };
}
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "auto",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
    justifyContent: "space-around"
  },
  orderList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },

  orderFooter: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    backgroundColor: "#e1e1e1",

    [theme.breakpoints.up("md")]: {
      width: "100%"
      // width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  orderItems: {
    display: "flex",
    justifyContent: "center"
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
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      maxWidth: 1000
      // paddingLeft: "20rem",
      // paddingRight: "20rem"
    }
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
    store: "",
    menu: [],
    categories: [],
    width: null,
    left: false,
    tabValue: 0,
    open: [],
    orderOpen: false,
    sectionOpen: false,
    mobileOpen: false,
    multiline: "",
    ingredients: {
      name: []
    },
    extra: {
      name: []
    },
    quantity: 1,
    order: [],
    total: [],
    user: "",
    password: ""
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
    this.setState({
      menu: this.props.post.acf.menu_sections,
      store: this.props.post.title.rendered
    });
  };
  // componentWillUnmount = () => {
  //   this.setState({
  //     menu: [],
  //     store: ""
  //   });
  // };
  handleTabChange = (e, tabValue) => {
    e.preventDefault();
    this.setState({ tabValue });
  };
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleIngredientsChange = name => event => {
    //check if exisests in state then add if not
    this.setState({
      ingredients: {
        ...this.state.ingredients,
        [name]: event.target.checked
      }
    });
  };
  handleExtraChange = name => event => {
    //check if exisests in state then add if not
    this.setState({
      extra: {
        ...this.state.extra,
        [name]: event.target.checked
      }
    });
  };
  handleOrderOpen = () => {
    this.setState({ orderOpen: true });
  };
  handleOrderClose = () => {
    this.setState({ orderOpen: false });
  };
  handleSectionOpen = () => {
    this.setState({ sectionOpen: true });
  };
  handleSectionClose = () => {
    this.setState({ sectionOpen: false });
  };
  handleModalOpen = item => {
    if (item.ingredients.length > 0) {
      const ingObj = item.ingredients.map(v => {
        const val = v.ingredient_name;
        return val;
      });
      var ingredientsObj = ingObj.reduce((acc, cur, i) => {
        i = cur;
        acc[i] = true;
        return acc;
      }, {});
    }
    if (item.extra.length > 0) {
      const extObj = item.extra.map(v => {
        const val = v.extra_name;
        return val;
      });
      var extraObj = extObj.reduce((acc, cur, i) => {
        i = cur;
        acc[i] = false;
        return acc;
      }, {});
    }

    this.setState({
      open: {
        [item.dish_name]: true
      },
      ingredients: ingredientsObj,
      extra: extraObj
    });
  };

  handleModalClose = () => {
    this.setState({
      open: false,
      ingredients: [],
      extra: [],
      quantity: 1
    });
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  quantityMinus = () => {
    let quantity = this.state.quantity;
    quantity = quantity - 1;
    if (quantity <= 0) {
      return;
    }
    this.setState({ quantity });
  };
  quantityPlus = () => {
    let quantity = this.state.quantity;
    quantity = quantity + 1;
    this.setState({ quantity });
  };

  addToOrder = item => {
    let extraPrice = 0;
    if (this.state.extra) {
      const extraName = Object.keys(this.state.extra).filter(key => {
        return this.state.extra[key];
      });
      let filtered = item.extra.filter(i => {
        return extraName.indexOf(i.extra_name) !== -1;
      });
      const mapped = filtered.map(i => {
        let prices = parseFloat(i.extra_price);
        return prices;
      });
      extraPrice = mapped.reduce((a, b) => a + b, 0);
    }
    const price =
      this.state.quantity * (parseFloat(item.dish_price) + extraPrice);
    const orderItems = {
      name: item.dish_name,
      ingredients: this.state.ingredients,
      quantity: this.state.quantity,
      extras: this.state.extra,
      multiline: this.state.multiline,
      price: price
    };

    this.setState({
      order: [...this.state.order, orderItems],
      open: false,
      quantity: 1,
      multiline: "",
      total: [...this.state.total, price]
    });
  };
  sendOrder = () => {
    const data = {
      store: this.state.store,
      orders: this.state.order,
      total: this.state.total.reduce((a, b) => a + b, 0)
    };
    fetch(`${Config.apiUrl}/wp-json/orpheus/v1/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        // if (myJson === "message sent") {
        // } else {
        //   console.log("error");
        // }
      });

    this.setState({
      order: [],
      total: []
    });
  };
  render() {
    const showTotal = this.state.total.reduce((a, b) => a + b, 0);
    const { classes, theme } = this.props;
    const { tabValue } = this.state;
    const categories = this.state.menu.map((category, index) => {
      return (
        <div key={index}>
          <ListItem className={classes.sections}>
            {category.section_title}{" "}
          </ListItem>
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
          user={this.state.user}
          password={this.state.password}
          showPassword={this.showPassword}
          handleInputChange={this.handleInputChange}
        />

        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                <Tabs
                  value={tabValue}
                  onChange={this.handleTabChange}
                  indicatorColor="secondary"
                  textColor="primary"
                  centered={true}
                >
                  <Tab label="Menu" />
                  <Tab label="Info" />
                  <Tab label="Reviews" />
                  <Tab label="My orders" href="#basic-tabs" />
                </Tabs>
              </Typography>
            </Toolbar>
          </AppBar>

          <main className={classes.content}>
            <div className={classes.toolbar} />

            {tabValue === 0 && (
              <div className="main">
                <div className={classes.orderFooter}>
                  <div className="section-list">
                    <Hidden only={["md", "lg", "xl"]}>
                      <Button onClick={this.handleSectionOpen}>
                        <MenuIcon />
                      </Button>
                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.sectionOpen}
                        onClose={this.handleSectionClose}
                      >
                        <div style={getModalStyle()} className={classes.paper}>
                          <Paper elevation={15}>
                            <div className={classes.orderList}>
                              <List>{categories}</List>
                              <div className={classes.orderList}>
                                <Button onClick={this.handleSectionClose}>
                                  Close
                                </Button>
                              </div>
                            </div>
                          </Paper>
                        </div>
                      </Modal>
                    </Hidden>
                  </div>
                  <div className="order">
                    <Hidden only={["md", "lg", "xl"]}>
                      <Button onClick={this.handleOrderOpen}>Open Modal</Button>
                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.orderOpen}
                        onClose={this.handleOrderClose}
                      >
                        <div style={getModalStyle()} className={classes.paper}>
                          <Paper elevation={15}>
                            <div className={classes.orderList}>
                              <List>
                                {Object.keys(this.state.order).map(key => (
                                  <Order
                                    key={key}
                                    details={this.state.order[key]}
                                  />
                                ))}
                              </List>
                              <div className={classes.orderList}>
                                {showTotal === 0 ? (
                                  <div className={classes.orderFooter}>
                                    <Typography variant="title" gutterBottom>
                                      You haven't order anything yet!
                                    </Typography>
                                  </div>
                                ) : (
                                  <div className={classes.orderFooter}>
                                    <Typography variant="title">
                                      <div>Total: {showTotal}</div>
                                    </Typography>
                                    <Button onClick={this.sendOrder}>
                                      Send
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Paper>
                        </div>
                      </Modal>
                    </Hidden>
                  </div>
                </div>
                <div className={classes.orderItems}>
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
                  <div className={classes.menuItems}>
                    <MenuItems
                      sections={this.state.menu}
                      handleQuantityChange={this.handleQuantityChange}
                      quantity={this.state.quantity}
                      quantityMinus={this.quantityMinus}
                      quantityPlus={this.quantityPlus}
                      ingredients={this.state.ingredients}
                      extra={this.state.extra}
                      handleInputChange={this.handleInputChange}
                      multiline={this.state.multiline}
                      handleIngredientsChange={this.handleIngredientsChange}
                      handleExtraChange={this.handleExtraChange}
                      handleModalOpen={this.handleModalOpen}
                      handleModalClose={this.handleModalClose}
                      addToOrder={this.addToOrder}
                      open={this.state.open}
                    />
                  </div>
                  <Hidden
                    smDown
                    implementation="css"
                    className={classes.menuItems}
                  >
                    <div className={classes.orderList}>
                      <Paper elevation={15}>
                        <div className={classes.orderList}>
                          <List>
                            {Object.keys(this.state.order).map(key => (
                              <Order
                                key={key}
                                details={this.state.order[key]}
                              />
                            ))}
                          </List>
                          <div className={classes.orderList}>
                            {showTotal === 0 ? (
                              <div className={classes.orderFooter}>
                                <Typography variant="title" gutterBottom>
                                  You haven't order anything yet!
                                </Typography>
                              </div>
                            ) : (
                              <div className={classes.orderFooter}>
                                <Typography variant="title">
                                  <div>Total: {showTotal}</div>
                                </Typography>
                                <Button onClick={this.sendOrder}>Send</Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Paper>
                    </div>
                  </Hidden>
                </div>
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
