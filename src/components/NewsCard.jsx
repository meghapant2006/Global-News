import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNews } from "../context/useNews";
import { cacheArticle } from "../services/newsApi";

function formatRelativeTime(dateString) {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMins = Math.max(1, Math.floor((now - date) / (1000 * 60)));
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function NewsCard({ article, variant = "standard" }) {
  const { toggleBookmark, isBookmarked, showToast } = useNews();
  const [imgSrc, setImgSrc] = useState(
    article.urlToImage ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80"
  );
  const navigate = useNavigate();

  if (!article) return null;

  const handleCardClick = () => {
    cacheArticle(article);
    navigate(`/article/${article.id}`);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark(article);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    cacheArticle(article);
    const shareUrl = `${window.location.origin}/article/${article.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: shareUrl
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast("Article link copied to clipboard!");
    }
  };

  // --- HERO VARIANT ---
  if (variant === "hero") {
    return (
      <div className="card gn-card-hero border-0 shadow-sm overflow-hidden mb-4" onClick={handleCardClick}>
        <div className="row g-0">
          <div className="col-lg-7 position-relative">
            <div className="gn-hero-img-wrapper">
              <img
                src={imgSrc}
                alt={article.title}
                className="img-fluid w-100 h-100 object-fit-cover gn-zoom-img"
                onError={() =>
                  setImgSrc(
                    "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80"
                  )
                }
                loading="eager"
              />
              <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 text-uppercase fw-bold">
                Featured Lead
              </span>
            </div>
          </div>
          <div className="col-lg-5 d-flex flex-column justify-content-between p-4 bg-white">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="gn-category-tag">{article.category || "World"}</span>
                <span className="text-muted small">
                  <i className="bi bi-clock me-1"></i>
                  {formatRelativeTime(article.publishedAt)}
                </span>
              </div>

              <h2 className="gn-hero-title mb-3">
                <Link to={`/article/${article.id}`} className="text-decoration-none text-dark">
                  {article.title}
                </Link>
              </h2>

              <p className="gn-card-desc text-muted mb-4">{article.description}</p>
            </div>

            <div className="d-flex align-items-center justify-content-between pt-3 border-top">
              <div className="small text-muted">
                <span className="fw-semibold text-dark">{article.author || "News Desk"}</span>
                <span className="mx-1">•</span>
                <span>{article.readTime || "4 min read"}</span>
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={handleBookmark}
                  className={`btn btn-sm btn-light border-0 ${
                    isBookmarked(article.id) ? "text-danger" : "text-muted"
                  }`}
                  title={isBookmarked(article.id) ? "Remove Bookmark" : "Save for later"}
                >
                  <i className={`bi ${isBookmarked(article.id) ? "bi-bookmark-fill" : "bi-bookmark"}`}></i>
                </button>
                <button onClick={handleShare} className="btn btn-sm btn-light text-muted border-0" title="Share">
                  <i className="bi bi-share"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- COMPACT / LIST VARIANT (Sidebar, Trending) ---
  if (variant === "compact") {
    return (
      <div
        className="gn-card-compact d-flex align-items-center gap-3 py-3 border-bottom cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="gn-compact-img-wrap flex-shrink-0 rounded overflow-hidden">
          <img
            src={imgSrc}
            alt={article.title}
            className="w-100 h-100 object-fit-cover"
            onError={() =>
              setImgSrc(
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80"
              )
            }
            loading="lazy"
          />
        </div>
        <div className="flex-grow-1 overflow-hidden">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-light text-primary border small py-0 px-2">
              {article.category || "News"}
            </span>
            <span className="text-muted small" style={{ fontSize: "0.75rem" }}>
              {formatRelativeTime(article.publishedAt)}
            </span>
          </div>
          <h6 className="gn-compact-title mb-1 text-truncate-2">
            <Link to={`/article/${article.id}`} className="text-decoration-none text-dark">
              {article.title}
            </Link>
          </h6>
          <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
            {article.source?.name || "Global News"}
          </div>
        </div>
      </div>
    );
  }

  // --- STANDARD GRID CARD VARIANT ---
  return (
    <div className="card gn-card-standard h-100 border-0 shadow-sm rounded-3 overflow-hidden cursor-pointer" onClick={handleCardClick}>
      <div className="gn-card-img-container position-relative">
        <img
          src={imgSrc}
          alt={article.title}
          className="card-img-top object-fit-cover gn-zoom-img"
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
            )
          }
          loading="lazy"
        />
        <span className="gn-category-badge position-absolute top-0 start-0 m-3">
          {article.category || "General"}
        </span>
      </div>

      <div className="card-body d-flex flex-column justify-content-between p-3">
        <div>
          <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
            <span>
              <i className="bi bi-clock me-1"></i>
              {formatRelativeTime(article.publishedAt)}
            </span>
            <span>{article.readTime || "3 min read"}</span>
          </div>

          <h5 className="card-title gn-card-title mb-2">
            <Link to={`/article/${article.id}`} className="text-decoration-none text-dark">
              {article.title}
            </Link>
          </h5>

          <p className="card-text text-muted small gn-card-text mb-3">
            {article.description}
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
          <div className="text-muted small text-truncate pe-2">
            <span className="fw-medium text-dark">{article.author || article.source?.name || "News Wire"}</span>
          </div>
          <div className="d-flex gap-1 flex-shrink-0">
            <button
              onClick={handleBookmark}
              className={`btn btn-sm btn-light border-0 ${
                isBookmarked(article.id) ? "text-danger" : "text-muted"
              }`}
              title={isBookmarked(article.id) ? "Remove Bookmark" : "Save for later"}
            >
              <i className={`bi ${isBookmarked(article.id) ? "bi-bookmark-fill" : "bi-bookmark"}`}></i>
            </button>
            <button onClick={handleShare} className="btn btn-sm btn-light text-muted border-0" title="Share">
              <i className="bi bi-share"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
