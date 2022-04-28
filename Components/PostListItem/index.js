import React, { Component } from "react";

import { CategoryLink, PostLink } from "../../utils/link-generator";

class PostsListItem extends Component {
  render() {
    const { elem } = this.props;

    return (
      <article>
        <div className="meta-image">
          <PostLink elem={elem}>
            <a>
              <img
                className="img-fluid"
                onError={(e) => ImgError(e)}
                src={elem.featured_image}
                alt={elem.title}
              />
            </a>
          </PostLink>
        </div>

        <header className="entry-header">
          <span className="meta-category">
            <CategoryLink elem={elem}>{elem.category.name}</CategoryLink>
          </span>

          <span className="entry-date">{elem.published_at}</span>

          <h2 className="entry-title">
            <PostLink elem={elem}>{elem.title}</PostLink>
          </h2>
        </header>
      </article>
    );
  }
}

export default PostsListItem;
