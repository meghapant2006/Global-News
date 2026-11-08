import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/sampleArticles";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="gn-footer bg-navy text-white pt-5 pb-4 mt-5">
      <div className="container-xl">
        {/* Top Footer Banner */}
        <div className="row pb-4 mb-4 border-bottom border-secondary g-4 align-items-center">
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="gn-logo-badge">
                <i className="bi bi-globe-americas text-white fs-4"></i>
              </div>
              <h3 className="fw-bold mb-0 text-white">
                <span>GLOBAL</span> <span className="text-danger">NEWS</span>
              </h3>
            </div>
            <p className="text-white-50 mb-0 small" style={{ maxWidth: "520px" }}>
              Global News provides verified, unbiased journalism from correspondents stationed across
              the world. Dedicated to independent reporting, transparency, and civil discourse.
            </p>
          </div>
          <div className="col-lg-6 text-lg-end">
            <button
              onClick={scrollToTop}
              className="btn btn-outline-light btn-sm rounded-pill px-3 py-2"
              aria-label="Back to top of page"
            >
              <i className="bi bi-arrow-up me-1"></i> Back to Top
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="row g-4 mb-4">
          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold text-danger mb-3 small tracking-wide">
              Sections
            </h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat}`}
                    className="text-white-50 text-decoration-none hover-white"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold text-danger mb-3 small tracking-wide">
              Editorial & Shows
            </h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li>
                <Link to="/bookmarks" className="text-white-50 text-decoration-none hover-white">
                  Reading List
                </Link>
              </li>
              <li>
                <a href="#podcasts" className="text-white-50 text-decoration-none hover-white">
                  Global Podcasts
                </a>
              </li>
              <li>
                <a href="#video" className="text-white-50 text-decoration-none hover-white">
                  Live Broadcast
                </a>
              </li>
              <li>
                <a href="#investigations" className="text-white-50 text-decoration-none hover-white">
                  Investigative Reports
                </a>
              </li>
              <li>
                <a href="#factcheck" className="text-white-50 text-decoration-none hover-white">
                  Fact Check Desk
                </a>
              </li>
              <li>
                <a href="#weather" className="text-white-50 text-decoration-none hover-white">
                  Weather Radar
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold text-danger mb-3 small tracking-wide">
              About & Trust
            </h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li>
                <a href="#about" className="text-white-50 text-decoration-none hover-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#code" className="text-white-50 text-decoration-none hover-white">
                  Journalistic Standards
                </a>
              </li>
              <li>
                <a href="#corrections" className="text-white-50 text-decoration-none hover-white">
                  Corrections Policy
                </a>
              </li>
              <li>
                <a href="#press" className="text-white-50 text-decoration-none hover-white">
                  Press Releases
                </a>
              </li>
              <li>
                <a href="#careers" className="text-white-50 text-decoration-none hover-white">
                  Careers & Fellowships
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white-50 text-decoration-none hover-white">
                  Contact Newsroom
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold text-danger mb-3 small tracking-wide">
              Connect & Follow
            </h6>
            <p className="text-white-50 small mb-3">
              Follow our correspondents on verified social channels for instant alerts.
            </p>
            <div className="d-flex gap-3 mb-3 fs-5">
              <a href="#x" className="text-white-50 hover-white" aria-label="X">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#fb" className="text-white-50 hover-white" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#yt" className="text-white-50 hover-white" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#ig" className="text-white-50 hover-white" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#linkedin" className="text-white-50 hover-white" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#rss" className="text-white-50 hover-white" aria-label="RSS Feed">
                <i className="bi bi-rss-fill"></i>
              </a>
            </div>
            <div className="text-white-50 small">
              <i className="bi bi-shield-check text-success me-1"></i> SSL 256-Bit Encrypted News Wire
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-4 border-top border-secondary small text-white-50 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div>
            &copy; {new Date().getFullYear()} Global News Digital Media. All rights reserved.
          </div>
          <div className="d-flex gap-3 flex-wrap">
            <a href="#privacy" className="text-white-50 text-decoration-none hover-white">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="text-white-50 text-decoration-none hover-white">Terms of Use</a>
            <span>•</span>
            <a href="#adchoices" className="text-white-50 text-decoration-none hover-white">Ad Choices</a>
            <span>•</span>
            <a href="#accessibility" className="text-white-50 text-decoration-none hover-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
