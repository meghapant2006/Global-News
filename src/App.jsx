import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NewsProvider } from "./context/NewsContext";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Homepage from "./pages/homepage.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import "./App.css";

export default function App() {
  return (
    <NewsProvider>
      <BrowserRouter>
        <div className="gn-app-wrapper d-flex flex-column min-vh-100">
          <Navbar />
          <div className="gn-content-area flex-grow-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/category/:categoryName" element={<Homepage />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </NewsProvider>
  );
}
