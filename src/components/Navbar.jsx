import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useNews } from "../context/useNews";
import { CATEGORIES } from "../data/sampleArticles";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { bookmarks } = useNews();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setIsNavOpen(false);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <header className="gn-header sticky-top bg-white shadow-sm">
      {/* Top Utility Bar */}
      <div className="gn-topbar py-1 border-bottom">
        <div className="container-xl d-flex align-items-center justify-content-between text-muted small">
          <div className="d-flex align-items-center gap-3">
            <span className="gn-topbar-date d-none d-md-inline">
              <i className="bi bi-calendar3 me-1"></i> {currentDate}
            </span>
            <span className="gn-weather d-none d-sm-inline">
              <i className="bi bi-cloud-sun text-warning me-1"></i> 21°C • Ottawa, ON
            </span>
            <span className="badge bg-light text-secondary border">
              Edition: <strong className="text-dark">Global</strong>
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link
              to="/bookmarks"
              className="text-decoration-none text-muted d-flex align-items-center gap-1 hover-primary"
            >
              <i className="bi bi-bookmark-fill text-danger"></i>
              <span className="d-none d-sm-inline">Reading List</span>
              {bookmarks.length > 0 && (
                <span className="badge bg-danger rounded-pill px-2">{bookmarks.length}</span>
              )}
            </Link>

            <div className="vr d-none d-sm-block"></div>

            <div className="d-none d-sm-flex align-items-center gap-2">
              <a href="#twitter" className="text-muted" aria-label="X/Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#facebook" className="text-muted" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#youtube" className="text-muted" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="gn-brand-bar py-2 py-md-3 border-bottom">
        <div className="container-xl d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <button
              className="navbar-toggler d-lg-none btn btn-light border p-2"
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-label="Toggle navigation menu"
            >
              <i className={`bi ${isNavOpen ? "bi-x-lg" : "bi-list"} fs-4`}></i>
            </button>

            <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
              <div className="gn-logo-badge">
                <i className="bi bi-globe-americas text-white fs-4"></i>
              </div>
              <div className="d-flex flex-column">
                <span className="gn-brand-title lh-1">
                  <span className="gn-brand-global">GLOBAL</span>
                  <span className="gn-brand-news">NEWS</span>
                </span>
                <span className="gn-brand-tagline text-muted d-none d-sm-inline">
                  Verified • Objective • Worldwide
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="gn-search-box d-none d-md-block" style={{ maxWidth: "380px", width: "100%" }}>
            <form onSubmit={handleSearch} className="position-relative">
              <input
                type="text"
                className="form-control rounded-pill pe-5 ps-3 py-2 bg-light border-0"
                placeholder="Search breaking stories, topics, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 text-muted border-0"
                aria-label="Submit Search"
              >
                <i className="bi bi-search fs-6"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Primary Category Navigation */}
      <nav className="gn-cat-nav bg-dark-navy">
        <div className="container-xl">
          <div className={`gn-nav-scroll ${isNavOpen ? "d-block" : "d-none d-lg-block"}`}>
            {/* Mobile Search input */}
            <div className="d-block d-md-none p-3 pb-0">
              <form onSubmit={handleSearch} className="position-relative mb-2">
                <input
                  type="text"
                  className="form-control rounded-pill pe-5 ps-3 bg-light border-0"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 text-muted border-0"
                >
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>

            <ul className="navbar-nav flex-row flex-wrap align-items-center py-1 gap-1">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 text-white gn-nav-item ${isActive ? "active" : ""}`
                  }
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="bi bi-house-door-fill me-1 small"></i> Home
                </NavLink>
              </li>

              {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <li key={cat} className="nav-item">
                  <NavLink
                    to={`/category/${cat}`}
                    className={({ isActive }) =>
                      `nav-link px-3 py-2 text-white gn-nav-item ${isActive ? "active" : ""}`
                    }
                    onClick={() => setIsNavOpen(false)}
                  >
                    {cat}
                  </NavLink>
                </li>
              ))}

              <li className="nav-item ms-lg-auto">
                <NavLink
                  to="/bookmarks"
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 text-warning gn-nav-item ${isActive ? "active" : ""}`
                  }
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="bi bi-bookmarks-fill me-1"></i> Saved ({bookmarks.length})
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
