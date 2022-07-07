import React, { Component, createRef } from "react";

import ImgDom from "../../Components/ImgDom";
import PostImageSkeleton from "../Skeletons/PostImage";

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

    const ImgSkeleton = <PostImageSkeleton />;
    const ImgDomElem = <ImgDom elem={elem} />;

    const ImgElem = isInView ? ImgDomElem : ImgSkeleton;

    return (
      <article>
        <div className="meta-image" ref={this.imgRef}>
          {ImgElem}
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
