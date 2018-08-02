import Link from "next/link";
import Social from "./Social";
const Footer = () => (
  <footer>
    <div className="footer-elements">
      <Social />
      <p>
        <Link href="https://github.com/aristech">
          <a>Made by Aristech</a>
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
