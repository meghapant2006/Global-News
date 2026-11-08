import { SAMPLE_ARTICLES } from "../data/sampleArticles";

const API_KEY = "7be5962431a843a587fe0f8bbf062c75";

// Fallback high-res editorial images when an article has no image
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
];

function slugify(text) {
  if (!text) return `article-${Math.random().toString(36).substring(2, 9)}`;
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .substring(0, 60);
}

export async function fetchNews({ category = "All", query = "" } = {}) {
  let liveArticles = [];

  // Attempt to fetch from NewsAPI if query is given or category is selected
  try {
    let url = "";
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
    } else if (category && category !== "All") {
      const qParam = category.toLowerCase() === "canada" ? "canada" : category.toLowerCase();
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(qParam)}&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
    } else {
      url = `https://newsapi.org/v2/everything?q=world&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
    }

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.status === "ok" && Array.isArray(data.articles) && data.articles.length > 0) {
        liveArticles = data.articles
          .filter(a => a.title && a.title !== "[Removed]" && a.description)
          .map((item, index) => {
            const id = slugify(item.title) + `-${index}`;
            return {
              id,
              title: item.title,
              description: item.description,
              content: item.content || item.description || "Read more at the original source link below.",
              category: category !== "All" ? category : (index % 2 === 0 ? "World" : "Business"),
              author: item.author || (item.source && item.source.name) || "Global News Wire",
              source: item.source || { name: "Associated News" },
              publishedAt: item.publishedAt || new Date().toISOString(),
              readTime: "3 min read",
              urlToImage: item.urlToImage || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
              url: item.url,
              isBreaking: index === 0,
              isFeatured: index < 2,
              trendingRank: index + 1
            };
          });
      }
    }
  } catch (err) {
    console.warn("Live NewsAPI fetch fallback to curated sample data:", err.message);
  }

  // Filter curated samples
  let sampleFiltered = SAMPLE_ARTICLES;
  if (category && category !== "All") {
    sampleFiltered = sampleFiltered.filter(
      a => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    const qLower = query.toLowerCase();
    sampleFiltered = sampleFiltered.filter(
      a =>
        a.title.toLowerCase().includes(qLower) ||
        a.description.toLowerCase().includes(qLower) ||
        a.author.toLowerCase().includes(qLower) ||
        a.category.toLowerCase().includes(qLower)
    );
  }

  // If live articles were fetched successfully, prioritize them, but blend curated samples so category/homepage is rich
  const combined = [...liveArticles, ...sampleFiltered];

  // Remove duplicates by title
  const seen = new Set();
  const deduped = combined.filter(item => {
    const titleKey = item.title.trim().toLowerCase();
    if (seen.has(titleKey)) return false;
    seen.add(titleKey);
    return true;
  });

  return deduped.length > 0 ? deduped : sampleFiltered;
}

export function getArticleById(id) {
  // Check sample articles first
  const found = SAMPLE_ARTICLES.find(a => a.id === id);
  if (found) return found;

  // Check saved / cached articles from sessionStorage if any
  try {
    const cached = sessionStorage.getItem(`gn_article_${id}`);
    if (cached) return JSON.parse(cached);
  } catch {
    // ignore
  }

  return null;
}

export function cacheArticle(article) {
  if (!article || !article.id) return;
  try {
    sessionStorage.setItem(`gn_article_${article.id}`, JSON.stringify(article));
  } catch {
    // ignore
  }
}
