import Link from "next/link";
import Social from "./Social";
const Footer = () => (
  <footer>
    <div className="footer-elements">
      <Social />
      <p>
        <simple-svg data-icon="et-heart" />{" "}
        <Link href="https://github.com/aristech">
          <a>Made by Aristech</a>
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
