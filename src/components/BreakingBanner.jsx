import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BreakingBanner({ articles = [] }) {
  const breakingList = articles.filter(a => a.isBreaking);
  const items = breakingList.length > 0 ? breakingList : articles.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;
  const current = items[currentIndex];

  return (
    <div className="gn-breaking-bar py-1 px-3 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center overflow-hidden me-2">
        <span className="badge bg-danger text-uppercase fw-bold gn-breaking-pill me-2 px-2 py-1">
          <span className="gn-pulse-dot me-1"></span>
          Breaking
        </span>
        <Link
          to={`/article/${current.id}`}
          className="text-white text-decoration-none text-truncate fw-semibold gn-breaking-title small"
        >
          {current.title}
        </Link>
      </div>
      {items.length > 1 && (
        <div className="d-flex align-items-center gap-1 text-white-50 small flex-shrink-0">
          <span>{currentIndex + 1} / {items.length}</span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
            className="btn btn-sm text-white p-0 px-1 border-0"
            aria-label="Previous breaking headline"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
            className="btn btn-sm text-white p-0 px-1 border-0"
            aria-label="Next breaking headline"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
