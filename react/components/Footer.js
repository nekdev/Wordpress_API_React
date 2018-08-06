import Link from "next/link";
import Social from "./Social";
import MailChimp from "./MailChimp";
const Footer = () => (
  <footer>
    <div className="footer-elements">
      <Social />
      <MailChimp />

      <div className="sub-footer">
        <p className="mini-links">
          <Link
            as={`/page/privacy-policy`}
            href={`/post?slug=privacy-policy&apiRoute=page`}
          >
            <a className="policy">Privacy Policy</a>
          </Link>
          <Link
            as={`/page/terms-conditions`}
            href={`/post?slug=terms-conditions&apiRoute=page`}
          >
            <a className="policy">Terms & Conditions</a>
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
