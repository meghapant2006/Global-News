import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";

export default function Homepage() {
  let [articles, setArticles] = useState([]);
  let [totalresults, setTotalResults] = useState([0]);

  async function getApi() {
    let response = await fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2026-02-27&sortBy=publishedAt&apiKey=7be5962431a843a587fe0f8bbf062c75",
    );
    response = await response.json();

    if (response.status === "ok") {
      setArticles(response.articles);
      setTotalResults(response.totalResults);
    }
  }

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {articles.map((Item, index) => {
            return (
              <Newsitem
                key={index}
                source={Item.source.name}
                title={Item.title}
                author={Item.author}
                url={Item.url}
                urlToImage={Item.urlToImage}
                publishedAt={Item.publishedAt}
              ></Newsitem>
            );
          })}
        </div>
      </div>
    </>
  );
}
