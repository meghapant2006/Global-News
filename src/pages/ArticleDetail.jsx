import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getArticleById, fetchNews } from "../services/newsApi";
import { useNews } from "../context/useNews";
import NewsCard from "../components/NewsCard";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark, addComment, getComments, showToast } = useNews();

  const [article, setArticle] = useState(() => getArticleById(id));
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(() => !getArticleById(id));

  // Comment Form state
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let isMounted = true;

    async function loadData() {
      const found = getArticleById(id);

      if (found) {
        if (isMounted) {
          setArticle(found);
          setLoading(false);
        }
        try {
          const data = await fetchNews({ category: found.category || "All" });
          if (isMounted) {
            setRelated(data.filter((a) => a.id !== found.id).slice(0, 3));
          }
        } catch {
          // ignore
        }
        return;
      }

      try {
        const all = await fetchNews();
        if (!isMounted) return;
        const match = all.find((a) => a.id === id);
        if (match) {
          setArticle(match);
          const relData = await fetchNews({ category: match.category || "All" });
          if (isMounted) {
            setRelated(relData.filter((a) => a.id !== match.id).slice(0, 3));
          }
        }
      } catch {
        // ignore
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Article link copied to clipboard!");
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;
    addComment(id, { author: commentAuthor, text: commentText });
    setCommentAuthor("");
    setCommentText("");
  };

  if (loading) {
    return (
      <div className="container-xl py-5 text-center">
        <div className="spinner-border text-primary my-4" role="status"></div>
        <p className="text-muted">Loading dispatch...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container-xl py-5 text-center">
        <i className="bi bi-file-earmark-x fs-1 text-danger mb-3 d-block"></i>
        <h2 className="fw-bold">Article Not Found</h2>
        <p className="text-muted mb-4">
          The requested dispatch could not be retrieved or may have moved.
        </p>
        <button onClick={() => navigate("/")} className="btn btn-navy rounded-pill px-4">
          <i className="bi bi-arrow-left me-1"></i> Return to Homepage
        </button>
      </div>
    );
  }

  const comments = getComments(id);
  const bookmarked = isBookmarked(article.id);

  return (
    <article className="gn-article-detail container-xl py-4">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-muted">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/category/${article.category || "General"}`}
              className="text-decoration-none text-muted"
            >
              {article.category || "News"}
            </Link>
          </li>
          <li className="breadcrumb-item active text-truncate" aria-current="page" style={{ maxWidth: "300px" }}>
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="row g-4 justify-content-center">
        <div className="col-lg-9">
          {/* Category Badge & Headline */}
          <div className="mb-3">
            <span className="gn-category-tag mb-2 d-inline-block">
              {article.category || "Special Report"}
            </span>
            <h1 className="gn-article-headline fw-bold text-dark mb-3">
              {article.title}
            </h1>
            <p className="lead text-muted gn-article-lead mb-4">
              {article.description}
            </p>
          </div>

          {/* Author Byline & Social Actions Bar */}
          <div className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-top border-bottom">
            <div className="d-flex align-items-center gap-3">
              <div className="gn-author-avatar rounded-circle bg-navy text-white d-flex align-items-center justify-content-center fw-bold">
                {article.author ? article.author[0] : "G"}
              </div>
              <div>
                <div className="fw-bold text-dark small">{article.author || "Global News Wire"}</div>
                <div className="text-muted small" style={{ fontSize: "0.8rem" }}>
                  <span>{new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime || "4 min read"}</span>
                  <span className="mx-2">•</span>
                  <span className="text-primary">{article.source?.name || "Global News"}</span>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
              <button
                onClick={() => toggleBookmark(article)}
                className={`btn btn-sm ${bookmarked ? "btn-danger" : "btn-outline-secondary"} rounded-pill px-3`}
              >
                <i className={`bi ${bookmarked ? "bi-bookmark-fill" : "bi-bookmark"} me-1`}></i>
                {bookmarked ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleShare}
                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
              >
                <i className="bi bi-share me-1"></i> Share
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-sm btn-outline-secondary rounded-circle"
                title="Print Article"
                aria-label="Print"
              >
                <i className="bi bi-printer"></i>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          {article.urlToImage && (
            <figure className="mb-4">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="img-fluid rounded-3 w-100 object-fit-cover shadow-sm gn-article-hero-img"
              />
              <figcaption className="figure-caption mt-2 text-muted small d-flex justify-content-between">
                <span>Photo: Editorial dispatch coverage / Verified source image.</span>
                <span>Source: {article.source?.name || "Global News"}</span>
              </figcaption>
            </figure>
          )}

          {/* Key Takeaways Box */}
          <div className="p-4 mb-4 rounded-3 bg-light border-start border-4 border-danger">
            <h6 className="fw-bold text-uppercase text-dark mb-2 d-flex align-items-center gap-2">
              <i className="bi bi-card-checklist text-danger"></i> Key Takeaways
            </h6>
            <ul className="mb-0 small text-secondary d-flex flex-column gap-1">
              <li>Comprehensive coverage confirmed by independent regional correspondents.</li>
              <li>Ongoing discussions anticipate policy or market shifts in the coming quarter.</li>
              <li>Official representatives have pledged continued updates as developments unfold.</li>
            </ul>
          </div>

          {/* Article Body */}
          <div className="gn-article-body mb-5">
            {article.content ? (
              article.content
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="gn-paragraph mb-3">
                    {paragraph}
                  </p>
                ))
            ) : (
              <p className="gn-paragraph">{article.description}</p>
            )}

            {/* Pull Quote */}
            <blockquote className="gn-pullquote p-4 my-4 rounded border-start border-4 border-primary bg-light">
              <p className="mb-2 fst-italic fs-5 text-dark">
                "Accurate, verified reporting forms the backbone of a resilient society. When facts are
                presented transparently, citizens are empowered to shape the future."
              </p>
              <footer className="blockquote-footer small text-muted mb-0">
                Editorial Board, Global News Digital
              </footer>
            </blockquote>

            {article.url && (
              <div className="p-3 my-4 bg-light rounded text-muted small border">
                <span>Original Wire Reference: </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Visit publisher dispatch <i className="bi bi-box-arrow-up-right small"></i>
                </a>
              </div>
            )}
          </div>

          {/* Discussion & Comments Section */}
          <section className="gn-comments-section pt-4 border-top mb-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <i className="bi bi-chat-left-text-fill text-danger"></i>
                Community Discussion ({comments.length})
              </h4>
              <span className="badge bg-light text-muted border small">Civil Discussion Guidelines</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="card p-3 border-0 shadow-sm bg-light mb-4">
              <h6 className="fw-bold mb-2">Join the Conversation</h6>
              <div className="row g-2 mb-2">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Your name or handle *"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Share your perspective respectfully..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-navy btn-sm px-4 fw-semibold rounded-pill">
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 rounded bg-white border">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="fw-bold text-dark small">{c.author}</span>
                      <span className="text-muted small" style={{ fontSize: "0.75rem" }}>
                        {c.date}
                      </span>
                    </div>
                    <p className="mb-0 text-secondary small">{c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted small text-center py-3 bg-white rounded border">
                No reader comments yet. Be the first to share your thoughts on this story!
              </p>
            )}
          </section>

          {/* Related Stories */}
          {related.length > 0 && (
            <section className="gn-related-stories pt-4 border-top">
              <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <span className="gn-red-line"></span>
                Related Coverage
              </h4>
              <div className="row g-3">
                {related.map((rel) => (
                  <div key={rel.id} className="col-12 col-md-4">
                    <NewsCard article={rel} variant="standard" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
