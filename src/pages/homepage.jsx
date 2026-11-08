import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import BreakingBanner from "../components/BreakingBanner";
import TrendingWidget from "../components/TrendingWidget";
import { fetchNews } from "../services/newsApi";
import { CATEGORIES } from "../data/sampleArticles";

export default function Homepage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(categoryName || "All");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync activeCategory if route param changes
  useEffect(() => {
    setActiveCategory(categoryName || "All");
  }, [categoryName]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNews({ category: activeCategory });
        if (isMounted) {
          setArticles(data);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load latest stories at this time.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const handleCategorySelect = (cat) => {
    if (cat === "All") {
      navigate("/");
    } else {
      navigate(`/category/${cat}`);
    }
  };

  const heroArticle = articles.length > 0 ? articles[0] : null;
  const secondaryArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="gn-homepage">
      {/* Breaking News Ticker */}
      <BreakingBanner articles={articles} />

      <main className="container-xl py-4">
        {/* Category Pills Strip */}
        <div className="gn-category-strip d-flex align-items-center gap-2 mb-4 overflow-x-auto pb-2">
          <span className="text-muted small fw-bold text-uppercase me-2 flex-shrink-0">
            <i className="bi bi-funnel me-1"></i> Topics:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`btn btn-sm rounded-pill px-3 text-nowrap fw-medium gn-pill-btn ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? "btn-navy shadow-sm"
                  : "btn-outline-secondary bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Header Title for Category */}
        {activeCategory !== "All" && (
          <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
            <div>
              <span className="text-uppercase text-danger fw-bold small">Category Coverage</span>
              <h1 className="fw-bold text-dark display-6 mb-0">{activeCategory} News</h1>
            </div>
            <span className="badge bg-light text-dark border px-3 py-2">
              {articles.length} {articles.length === 1 ? "Story" : "Stories"}
            </span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading news...</span>
            </div>
            <p className="text-muted fw-medium">Fetching real-time dispatches & analysis...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-warning d-flex align-items-center gap-2 my-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill fs-5"></i>
            <div>{error} Displaying cached editorial coverage.</div>
          </div>
        )}

        {/* Content Layout */}
        {!loading && (
          <div className="row g-4">
            {/* Left 8-col Column: Hero Lead + Main Stories */}
            <div className="col-lg-8">
              {/* Featured Lead Hero */}
              {heroArticle && (
                <div className="mb-4">
                  <NewsCard article={heroArticle} variant="hero" />
                </div>
              )}

              {/* Section Divider */}
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2 fs-5">
                  <span className="gn-red-line"></span>
                  Latest Reports
                </h4>
                <span className="text-muted small">Updated 24/7</span>
              </div>

              {/* Grid of news cards */}
              {secondaryArticles.length > 0 ? (
                <div className="row g-3">
                  {secondaryArticles.map((article) => (
                    <div key={article.id} className="col-12 col-md-6 mb-2">
                      <NewsCard article={article} variant="standard" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-light rounded text-center text-muted">
                  <i className="bi bi-newspaper fs-1 d-block mb-2 text-secondary"></i>
                  <p className="mb-0">No additional articles found in this section right now.</p>
                </div>
              )}

              {/* Mid-page Editorial Spotlight */}
              <div className="gn-spotlight-banner p-4 rounded-3 text-white my-4 shadow-sm">
                <div className="row align-items-center g-3">
                  <div className="col-md-8">
                    <span className="badge bg-warning text-dark fw-bold mb-2">Special Investigation</span>
                    <h4 className="fw-bold mb-2">The Architecture of Modern Disinformation</h4>
                    <p className="small text-white-50 mb-0">
                      An in-depth multi-part investigation into synthetic media networks, coordinated social bots,
                      and how sovereign election oversight is evolving across continents.
                    </p>
                  </div>
                  <div className="col-md-4 text-md-end">
                    <button
                      onClick={() => {
                        if (heroArticle) navigate(`/article/${heroArticle.id}`);
                      }}
                      className="btn btn-light fw-bold px-4 rounded-pill"
                    >
                      Read Feature <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4-col Column: Trending & Widgets */}
            <div className="col-lg-4">
              <TrendingWidget articles={articles} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
