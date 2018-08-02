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
    <script src="//code.simplesvg.com/1/1.0.0-beta5/simple-svg.min.js" />
  </div>
);

export default Layout;
