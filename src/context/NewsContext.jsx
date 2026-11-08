import React, { useState, useEffect } from "react";
import { NewsContext } from "./newsContextBase";

export function NewsProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("gn_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem("gn_comments");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("gn_bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem("gn_comments", JSON.stringify(comments));
    } catch (e) {
      console.error(e);
    }
  }, [comments]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleBookmark = (article) => {
    setBookmarks((prev) => {
      const exists = prev.some((item) => item.id === article.id);
      if (exists) {
        showToast(`Removed from reading list: "${article.title.substring(0, 30)}..."`);
        return prev.filter((item) => item.id !== article.id);
      } else {
        showToast(`Saved to reading list: "${article.title.substring(0, 30)}..."`);
        return [article, ...prev];
      }
    });
  };

  const isBookmarked = (id) => {
    return bookmarks.some((item) => item.id === id);
  };

  const addComment = (articleId, { author, text }) => {
    if (!author.trim() || !text.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      author: author.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setComments((prev) => ({
      ...prev,
      [articleId]: [newComment, ...(prev[articleId] || [])]
    }));
    showToast("Comment posted successfully!");
  };

  const getComments = (articleId) => {
    return comments[articleId] || [];
  };

  return (
    <NewsContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked,
        comments,
        addComment,
        getComments,
        toastMessage,
        showToast
      }}
    >
      {children}
      {toastMessage && (
        <div className="gn-toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show align-items-center text-bg-dark border-0 shadow-lg" role="alert">
            <div className="d-flex">
              <div className="toast-body d-flex align-items-center gap-2">
                <i className="bi bi-info-circle-fill text-danger"></i>
                <span>{toastMessage}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </NewsContext.Provider>
  );
}
