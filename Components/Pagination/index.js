import React, { Component } from "react";

import { buildUrl, calculatePagination, isInt } from "../../utils/helpers";

import Styles from "../../styles/pagination.module.scss";

class Pagination extends Component {
  render() {
    const { totalCount, pageNumber, pageSize, targetUrl, handlePagination } =
      this.props;

    const currentPage = pageNumber;

    const pagination = calculatePagination(totalCount, pageNumber, pageSize);

    if (!pagination) return <></>;

    const firstPage = pagination[0];
    const lastPage = pagination.length;

    const processBtn = (arrow, isEligible, page) => {
      let params = { page };
      let url = buildUrl(targetUrl, params);

      return (
        <li>
          <a
            className={isEligible ? "active" : ""}
            disabled={!isEligible}
            onClick={(e) =>
              isEligible ? handlePagination(e, page) : e.preventDefault()
            }
            href={isEligible ? url : null}
          >
            {arrow === "prev" ? "<" : ">"}
          </a>
        </li>
      );
    };

    const ActionBtn = (type) => {
      let isNext = type == "next";
      let isEligible = isNext
        ? currentPage < lastPage
        : currentPage > firstPage;

      let page = isNext ? pageNumber + 1 : pageNumber - 1;

      return processBtn(type, isEligible, page);
    };

    const PageBtn = () => {
      return pagination.map((page, index) => {
        let params = { page };
        let url = buildUrl(targetUrl, params);

        let isEligible = isInt(page);
        let isClickable = isEligible && page !== currentPage;

        return (
          <li key={index}>
            <a
              className={page == currentPage ? Styles.active : ""}
              disabled={!isEligible}
              onClick={(e) =>
                isClickable ? handlePagination(e, page) : e.preventDefault()
              }
              href={isEligible ? url : null}
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
          {ActionBtn("prev")}

          <PageBtn />

          {ActionBtn("next")}
        </ul>
      </div>
    );
  }
}

export default Pagination;
