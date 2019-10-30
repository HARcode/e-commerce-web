import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    let { page, numOfPages, loadData } = this.props;
    if (numOfPages > 1) {
      let lower = page > 3 ? page - 1 : 1;
      let upper = page > numOfPages - 3 ? numOfPages : page + 1;
      let numbers = [...Array(upper - lower + 1).keys()].map(x => x + lower);
      return (
        <nav className="table-responsive mb-2">
          <ul className="pagination text-center">
            {/* PREVIOUS */}
            {page > 1 && (
              <li key="prev" className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadData(page - 1)}
                >
                  &laquo;
                </button>
              </li>
            )}

            {/* FIRST */}
            {page > 3 && (
              <li key="first" className="page-item">
                <button className="page-link" onClick={() => loadData(1)}>
                  1
                </button>
              </li>
            )}

            {/* LEFT ELLIPSIS */}
            {lower !== 1 && (
              <li key="le" className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadData(page - 2)}
                >
                  &#8230;
                </button>
              </li>
            )}

            {/* NUMBERS */}
            {numbers.map(num =>
              num === page ? (
                <li key={num} className="page-item active">
                  <span className="page-link">{num}</span>
                </li>
              ) : (
                <li key={num} className="page-item">
                  <button className="page-link" onClick={() => loadData(num)}>
                    {num}
                  </button>
                </li>
              )
            )}

            {/* RIGHT ELLIPSIS */}
            {upper !== numOfPages && (
              <li key="re" className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadData(page + 2)}
                >
                  &#8230;
                </button>
              </li>
            )}

            {/* LAST */}
            {page < numOfPages - 2 && (
              <li key="last" className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadData(numOfPages)}
                >
                  {numOfPages}
                </button>
              </li>
            )}

            {/* NEXT */}
            {page < numOfPages && (
              <li key="next" className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadData(page + 1)}
                >
                  &raquo;
                </button>
              </li>
            )}
          </ul>
        </nav>
      );
    }
    return <></>;
  }
}
