import React, { Component } from "react";

import { calculatePagination } from "../../utils/helpers";

import Styles from "../../styles/pagination.module.scss";

class Pagination extends Component {
  render() {
    const { totalCount, pageNumber, pageSize, handlePagination } = this.props;

    const currentPage = pageNumber;

    const pagination = calculatePagination(totalCount, pageNumber, pageSize);

    if (!pagination) return <></>;

    const firstPage = pagination[0];
    const lastPage = pagination.length;

    const processBtn = (arrow, isEligible, page) => {
      return (
        <li>
          <a
            className={isEligible ? "active" : ""}
            disabled={isEligible ? "" : "disabled"}
            onClick={() => (isEligible ? handlePagination(page) : null)}
          >
            {arrow === "prev" ? "<" : ">"}
          </a>
        </li>
      );
    };

    const PrevBtn = () => {
      const isEligible = currentPage > firstPage;

      return processBtn("prev", isEligible, pageNumber - 1);
    };

    const NextBtn = () => {
      const isEligible = currentPage < lastPage;

      return processBtn("next", isEligible, pageNumber + 1);
    };

    const PageBtn = () => {
      return pagination.map((page, index) => {
        return (
          <li key={index}>
            <a
              className={page == currentPage ? Styles.active : ""}
              onClick={() => handlePagination(page)}
            >
              {page}
            </a>
          </li>
        );
      });
    };

    return (
      <div className={Styles.PaginationSection}>
        <ul>
          <PrevBtn />
          <PageBtn />
          <NextBtn />
        </ul>
      </div>
    );
  }
}

export default Pagination;
