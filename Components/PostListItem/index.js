import React, { Component, createRef } from "react";

import { CategoryLink, PostLink } from "../../utils/link-generator";
import { ImgError } from "../../utils/helpers";

import watchIntersection from "../../libs/intersection";

class PostsListItem extends Component {
  constructor(props) {
    super(props);

    this.imgRef = createRef();

    this.state = {
      isInView: false,
    };
  }

  componentDidMount() {
    watchIntersection(this.imgRef.current, () => {
      this.setState({
        isInView: true,
      });
    });
  }

  render() {
    const { isInView } = this.state;

    const { elem } = this.props;
    const { title, featured_image } = elem;

    return (
      <article>
        <div className="meta-image" ref={this.imgRef}>
          <PostLink elem={elem}>
            <a>
              {isInView && (
                <img
                  className="img-fluid"
                  onError={(e) => ImgError(e)}
                  src={featured_image}
                  alt={title}
                />
              )}
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
