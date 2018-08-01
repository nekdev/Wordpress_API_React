import Header from "./Header";
import Footer from "./Footer";

const layoutStyle = {
  background: "#181818",
  color: "#fff"
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
