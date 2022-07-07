import React, { Component } from "react";
import { ImgError } from "../../utils/helpers";

import { PostLink } from "../../utils/link-generator";

class ImgDom extends Component {
  render() {
    const { elem, withLink = "true" } = this.props;
    const { title, featured_image } = elem;

    const renderLink = (Children) => {
      return <PostLink elem={elem}>{Children}</PostLink>;
    };

    const element = (
      <a>
        <img
          className="img-fluid"
          onError={(e) => ImgError(e)}
          src={featured_image}
          alt={title}
        />
      </a>
    );

    return withLink == "true" ? renderLink(element) : element;
  }
}

export default ImgDom;
