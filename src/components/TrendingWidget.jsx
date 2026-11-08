import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNews } from "../context/useNews";

export default function TrendingWidget({ articles = [] }) {
  const { showToast } = useNews();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const trendingItems = articles
    .slice()
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
    .slice(0, 5);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    showToast("Thank you for subscribing to Global News Daily Briefing!");
  };

  return (
    <div className="gn-trending-widget">
      {/* Trending Stories */}
      <div className="card border-0 shadow-sm rounded-3 p-3 mb-4 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
          <h5 className="fw-bold mb-0 d-flex align-items-center gap-2 text-dark fs-6 text-uppercase">
            <i className="bi bi-fire text-danger fs-5"></i>
            Trending Stories
          </h5>
          <span className="badge bg-danger-subtle text-danger small">Live</span>
        </div>

        <div className="gn-trending-list">
          {trendingItems.map((article, idx) => (
            <div
              key={article.id}
              className="d-flex align-items-start gap-3 py-2 border-bottom gn-trending-item"
            >
              <span className="gn-rank-badge">{idx + 1}</span>
              <div className="flex-grow-1 overflow-hidden">
                <span className="badge bg-light text-muted border mb-1" style={{ fontSize: "0.68rem" }}>
                  {article.category || "World"}
                </span>
                <h6 className="gn-trending-headline mb-1">
                  <Link
                    to={`/article/${article.id}`}
                    className="text-decoration-none text-dark"
                  >
                    {article.title}
                  </Link>
                </h6>
                <div className="text-muted small" style={{ fontSize: "0.72rem" }}>
                  {article.readTime || "3 min read"} • {article.source?.name || "Global News"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Box */}
      <div className="card border-0 rounded-3 p-4 mb-4 gn-newsletter-card text-white shadow-sm">
        <div className="d-flex align-items-center gap-2 mb-2">
          <i className="bi bi-envelope-paper-heart-fill fs-3 text-warning"></i>
          <h5 className="fw-bold mb-0">Daily Morning Brief</h5>
        </div>
        <p className="small text-white-50 mb-3">
          Get verified, unbiased news delivered directly to your inbox every morning at 7:00 AM.
        </p>

        {subscribed ? (
          <div className="alert alert-success d-flex align-items-center gap-2 mb-0 py-2 small">
            <i className="bi bi-check-circle-fill"></i>
            <span>You're subscribed! Check your inbox soon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe}>
            <div className="input-group mb-2">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-danger btn-sm px-3 fw-semibold" type="submit">
                Join
              </button>
            </div>
            <div className="text-white-50" style={{ fontSize: "0.7rem" }}>
              Zero spam. Unsubscribe at any time.
            </div>
          </form>
        )}
      </div>

      {/* Tasteful Sponsor / Ad Placeholder */}
      <div className="card border-0 rounded-3 p-3 mb-4 bg-light text-center border-dashed">
        <div className="text-muted text-uppercase mb-1" style={{ fontSize: "0.65rem", letterSpacing: "1px" }}>
          Advertisement • Partner Showcase
        </div>
        <div className="py-4 px-2">
          <i className="bi bi-shield-check text-primary fs-1 mb-2 d-block"></i>
          <h6 className="fw-bold text-dark mb-1">Global Renewable Energy Summit 2027</h6>
          <p className="small text-muted mb-2">
            Register early for the world's preeminent conference on sovereign clean power grids.
          </p>
          <a href="#sponsor" className="btn btn-sm btn-outline-dark px-3 rounded-pill">
            Learn More <i className="bi bi-arrow-up-right small ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
