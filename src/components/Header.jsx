
import { Fragment } from "react";
import Link from "next/link";

const Header = () => {
  return (
    <Fragment>
        <section className="header_main">
          <header className="container d-flex justify-content-between">
            <div className="logo">
              <Link href="/">
              <h3>Cummings-Breitenberg LLC</h3>
              </Link>
            </div>
            <nav>
              <ul className="d-flex">
              <li className="header_item">
                  <Link href="/">
                    Home
                  </Link>
                </li>
                <li className="header_item">
                <Link href="/contact">
                  Contact
                  </Link>
                  </li>
                
              </ul>
              
            </nav>
          </header>
        </section>
     
    </Fragment>
  );
};
export default Header;
