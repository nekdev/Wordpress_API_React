import Link from "next/link";

const hrStyle = {
  marginTop: 75
};

const Footer = () => (
  <div>
    <hr style={hrStyle} />
    <p>
      ❤️{" "}
      <Link href="https://github.com/aristech">
        <a>Made by Aristech</a>
      </Link>
    </p>
  </div>
);

export default Footer;
