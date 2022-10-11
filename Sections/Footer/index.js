import Link from "next/link";

const FooterSection = () => {
  const year = new Date().getFullYear();
  const FooterTextFirst = `Copyright © ${year} `;
  const FooterTextSecond = ` All Rights Reserved`;

  const FooterLink = () => {
    return (
      <Link
        href={{
          pathname: `/`,
        }}
      >
        Zurnal.co
      </Link>
    );
  };

  return (
    <footer id="footer" className="site-footer">
      <div className="container-full site-info">
        <div className="container">
          <div className="vce-wrap-left">
            <p>
              <span id="copyRightFooter">
                {FooterTextFirst}
                <FooterLink />
                <br />
                {FooterTextSecond}
              </span>
            </p>
          </div>

          <div className="vce-wrap-right">
            <ul id="vce_footer_menu" className="bottom-nav-menu">
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a>About Us</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a>Term of Services</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a>EULA</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a>Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
