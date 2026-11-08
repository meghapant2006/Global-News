import React from "react";
import { Link } from "react-router-dom";
import { useNews } from "../context/useNews";
import NewsCard from "../components/NewsCard";

export default function BookmarksPage() {
  const { bookmarks } = useNews();

  return (
    <div className="container-xl py-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
        <div>
          <span className="text-uppercase text-danger fw-bold small">Personal Archive</span>
          <h1 className="fw-bold text-dark display-6 mb-0">Your Reading List</h1>
          <p className="text-muted small mb-0 mt-1">
            Articles and investigations saved locally on your device for later reading.
          </p>
        </div>
        <div className="badge bg-danger rounded-pill px-3 py-2 fs-6">
          {bookmarks.length} {bookmarks.length === 1 ? "Story" : "Stories"}
        </div>
      </div>

      {bookmarks.length > 0 ? (
        <div className="row g-4">
          {bookmarks.map((article) => (
            <div key={article.id} className="col-12 col-md-6 col-lg-4">
              <NewsCard article={article} variant="standard" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-light rounded-3 p-5">
          <i className="bi bi-bookmark-heart fs-1 text-danger mb-3 d-block"></i>
          <h4 className="fw-bold text-dark">Your Reading List is Empty</h4>
          <p className="text-muted mb-4 small" style={{ maxWidth: "420px", margin: "0 auto" }}>
            Click the bookmark icon on any headline or story card while browsing to save it here for
            distraction-free reading anytime.
          </p>
          <Link to="/" className="btn btn-navy rounded-pill px-4 fw-semibold">
            <i className="bi bi-compass me-1"></i> Discover Top Stories
          </Link>
        </div>
      )}
    </div>
  );
}
