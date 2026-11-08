import React from "react";
import NewsCard from "../components/NewsCard";

export default function Newsitem(props) {
  const generatedId = props.id || (props.title ? props.title.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").substring(0, 60) : "news-item");
  const article = {
    id: generatedId,
    title: props.title,
    description: props.description || props.title,
    author: props.author,
    source: { name: props.source },
    url: props.url,
    urlToImage: props.urlToImage,
    publishedAt: props.publishedAt,
    category: props.category || "General"
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <NewsCard article={article} variant="standard" />
    </div>
  );
}
