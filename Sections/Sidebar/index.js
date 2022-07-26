import Link from "next/link";

const Sidebar = () => {
  const year = new Date().getFullYear();
  const FTextFirst = `Copyright © ${year} `;
  const FTextSecond = ` All Rights Reserved`;

  const FLink = () => {
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
    <div className="sidebar-section col-md-3 col-12">
      <div className="sidebar">
        <div className="vce-sticky">
          <div id="text-3" className="main-box widget widget_text">
            <div className="textwidget">
              <div id="widget_upper">
                <a href="#">About Us</a>
                <span> - </span>
                <a href="#">Term Of Services</a>
                <span> - </span>
                <a href="#">Privacy Policy</a>
                <span> - </span>
                <a href="#">EULA</a>
                <span> - </span>
                <a href="#">Contact Us</a>
                <br />
              </div>

              <div id="widget_social">
                <a className="facebook" href="#" target="_blank">
                  <i className="fa fa-facebook"></i>
                </a>

                <a className="twitter" href="#" target="_blank">
                  <i className="fa fa-twitter"></i>
                </a>

                <a className="instagram" href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </div>

              <div id="widget_copyright">
                <p id="copyRight">
                  {FTextFirst}
                  <FLink />
                  <br />
                  {FTextSecond}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
