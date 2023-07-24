import Link from "next/link";
const Footer = () => {
  return (
    <div className="footer">
      <ul className="d-flex vertical">
        <li className="header_item">
          <Link href="/">Cummings-Breitenberg LLC</Link>
        </li>
        <li className="header_item">
          <Link href="/">Home</Link>
        </li>
        <li className="header_item">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
