import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../services/newsApi";
import { CATEGORIES } from "../data/sampleArticles";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchNews({ query, category: selectedCategory })
      .then((data) => {
        if (isMounted) {
          setArticles(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [query, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearchParams({ q: searchTerm.trim() });
  };

  return (
    <div className="container-xl py-4">
      {/* Search Header */}
      <div className="gn-search-header bg-light p-4 rounded-3 mb-4 border">
        <h2 className="fw-bold text-dark mb-2">Search Dispatches & Topics</h2>
        <p className="text-muted small mb-3">
          Explore our real-time editorial archive by keywords, authors, or categories.
        </p>

        <form onSubmit={handleSearchSubmit} className="row g-2 align-items-center">
          <div className="col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 py-2"
                placeholder="Search headlines, keywords, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <button type="submit" className="btn btn-navy w-100 py-2 fw-semibold">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Meta */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <div>
          <h4 className="fw-bold mb-0">
            {query ? (
              <>
                Results for: <span className="text-primary">"{query}"</span>
              </>
            ) : (
              "All Dispatches"
            )}
          </h4>
          {selectedCategory !== "All" && (
            <span className="badge bg-secondary-subtle text-secondary mt-1">
              Filtered by: {selectedCategory}
            </span>
          )}
        </div>
        <span className="text-muted small">
          Found <strong>{articles.length}</strong> matching {articles.length === 1 ? "article" : "articles"}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-2" role="status"></div>
          <p className="text-muted">Searching archives...</p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && articles.length > 0 && (
        <div className="row g-4">
          {articles.map((article) => (
            <div key={article.id} className="col-12 col-md-6 col-lg-4">
              <NewsCard article={article} variant="standard" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-5 bg-light rounded-3 p-5">
          <i className="bi bi-search-heart fs-1 text-muted mb-3 d-block"></i>
          <h4 className="fw-bold text-dark">No Articles Match Your Search</h4>
          <p className="text-muted mb-4 small" style={{ maxWidth: "450px", margin: "0 auto" }}>
            We couldn't find any news articles matching "{query}". Try checking your spelling or
            browsing our trending topics below.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-2">
            {["Technology", "Energy", "Climate", "Politics", "Canada", "Markets"].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchTerm(term);
                  setSearchParams({ q: term });
                }}
                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
