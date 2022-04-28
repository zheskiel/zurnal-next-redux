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
                {FooterTextSecond}
              </span>
            </p>
          </div>

          <div className="vce-wrap-right">
            <ul id="vce_footer_menu" className="bottom-nav-menu">
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7283">
                <a href="#">About Us</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7294">
                <a href="#">Term of Services</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7282">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7290">
                <a href="#">EULA</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7291">
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
