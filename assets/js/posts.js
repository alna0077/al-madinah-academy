const POSTS_DATA_URL = "data/posts.json";

const postDateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

const sortPostsByDate = (posts) => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

const formatPostDate = (dateValue) => {
  const date = new Date(`${dateValue}T12:00:00`);
  return Number.isNaN(date.getTime()) ? dateValue : postDateFormatter.format(date);
};

const createElement = (tag, className, text) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

const createPostLink = (post) => `post.html?slug=${encodeURIComponent(post.slug)}`;

const createPostMeta = (post) => {
  const meta = createElement("div", "post-meta");
  const category = createElement("span", "post-category", post.category || "Update");
  const date = createElement("time", "", formatPostDate(post.date));
  date.dateTime = post.date;
  meta.append(category, date);
  return meta;
};

const createPostCard = (post, options = {}) => {
  const article = createElement("article", options.featured ? "post-card post-card-featured" : "post-card");

  if (post.image) {
    const imageLink = createElement("a", "post-card-image");
    imageLink.href = createPostLink(post);
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.alt || "";
    img.loading = "lazy";
    imageLink.append(img);
    article.append(imageLink);
  }

  const body = createElement("div", "post-card-body");
  body.append(createPostMeta(post));

  const title = createElement(options.featured ? "h3" : "h2");
  const titleLink = document.createElement("a");
  titleLink.href = createPostLink(post);
  titleLink.textContent = post.title;
  title.append(titleLink);
  body.append(title);

  if (post.excerpt) body.append(createElement("p", "post-excerpt", post.excerpt));

  const readMore = createElement("a", "btn-link", "Read More");
  readMore.href = createPostLink(post);
  body.append(readMore);

  article.append(body);
  return article;
};

const fetchPosts = async () => {
  const response = await fetch(POSTS_DATA_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error("Unable to load posts data.");
  const posts = await response.json();
  if (!Array.isArray(posts)) throw new Error("Posts data must be an array.");
  return sortPostsByDate(posts);
};

const renderCategoryFilters = (posts, activeCategory, onFilter) => {
  const filterWrap = document.querySelector("[data-post-filters]");
  if (!filterWrap) return;

  filterWrap.replaceChildren();
  const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))];

  categories.forEach((category) => {
    const button = createElement("button", "post-filter", category);
    button.type = "button";
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => onFilter(category));
    filterWrap.append(button);
  });
};

const renderPostsList = (posts, activeCategory = "All") => {
  const list = document.querySelector("[data-posts-list]");
  const empty = document.querySelector("[data-posts-empty]");
  if (!list) return;

  const visiblePosts = activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);
  list.replaceChildren(...visiblePosts.map((post) => createPostCard(post)));
  if (empty) empty.hidden = visiblePosts.length > 0;
};

const renderFeaturedPost = (posts) => {
  const featuredWrap = document.querySelector("[data-featured-post]");
  if (!featuredWrap) return;

  const featured = posts.find((post) => post.featured) || posts[0];
  featuredWrap.replaceChildren(featured ? createPostCard(featured, { featured: true }) : createElement("p", "empty-state", "No featured post is available yet."));
};

const renderListingPage = async () => {
  const list = document.querySelector("[data-posts-list]");
  if (!list) return;

  try {
    const posts = await fetchPosts();
    let activeCategory = "All";
    const applyFilter = (category) => {
      activeCategory = category;
      renderCategoryFilters(posts, activeCategory, applyFilter);
      renderPostsList(posts, activeCategory);
    };

    renderFeaturedPost(posts);
    renderPostsList(posts, activeCategory);
    renderCategoryFilters(posts, activeCategory, applyFilter);
  } catch (error) {
    console.error(error);
    list.replaceChildren(createElement("p", "empty-state", "Posts could not be loaded. Please use the local server or check data/posts.json."));
  }
};

const appendPostContent = (container, content = []) => {
  const items = Array.isArray(content) ? content : [content];

  items.forEach((item) => {
    if (typeof item === "string") {
      container.append(createElement("p", "", item));
      return;
    }

    if (item?.type === "heading") {
      container.append(createElement("h2", "", item.text || ""));
      return;
    }

    if (item?.type === "list" && Array.isArray(item.items)) {
      const list = document.createElement("ul");
      item.items.forEach((listItem) => list.append(createElement("li", "", listItem)));
      container.append(list);
    }
  });
};

const renderRelatedPosts = (posts, currentPost) => {
  const wrap = document.querySelector("[data-related-posts]");
  if (!wrap) return;

  const candidates = posts.filter((post) => post.slug !== currentPost.slug);
  let related = candidates
    .filter((post) => post.category === currentPost.category || post.tags?.some((tag) => currentPost.tags?.includes(tag)))
    .slice(0, 3);

  if (!related.length) related = candidates.slice(0, 3);

  wrap.replaceChildren();
  if (!related.length) return;

  wrap.append(createElement("p", "eyebrow", "Related"), createElement("h2", "", "More academy updates"));
  related.forEach((post) => wrap.append(createPostCard(post)));
};

const renderNotFoundPost = () => {
  const title = document.querySelector("[data-post-title]");
  const excerpt = document.querySelector("[data-post-excerpt]");
  const category = document.querySelector("[data-post-category]");
  const detail = document.querySelector("[data-post-detail]");

  if (category) category.textContent = "Not Found";
  if (title) title.textContent = "This academy update could not be found.";
  if (excerpt) excerpt.textContent = "The post may have moved, or the slug in the address may be incorrect.";
  if (detail) {
    const card = createElement("div", "empty-state");
    card.append(createElement("h2", "", "Post not found"), createElement("p", "", "Return to the news page to browse all available updates."));
    const link = createElement("a", "btn btn-primary", "Back to News");
    link.href = "news.html";
    card.append(link);
    detail.replaceChildren(card);
  }
};

const renderPostDetailPage = async () => {
  const detail = document.querySelector("[data-post-detail]");
  if (!detail) return;

  try {
    const posts = await fetchPosts();
    const slug = new URLSearchParams(window.location.search).get("slug");
    const post = posts.find((item) => item.slug === slug);
    if (!post) {
      renderNotFoundPost();
      return;
    }

    document.title = `${post.title} | Al-Madinah Quran and Sunnah Academy`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", post.excerpt || "Al-Madinah Academy update.");

    document.querySelector("[data-post-category]").textContent = post.category || "Academy Update";
    document.querySelector("[data-post-title]").textContent = post.title;
    document.querySelector("[data-post-excerpt]").textContent = post.excerpt || "";

    const hero = document.querySelector("[data-post-hero]");
    if (hero && post.image) hero.style.setProperty("--page-image", `url('../${post.image.replace(/^assets\//, "") }')`);

    const body = createElement("div", "post-content");
    body.append(createPostMeta(post));

    if (post.image) {
      const figure = createElement("figure", "post-hero-image");
      const img = document.createElement("img");
      img.src = post.image;
      img.alt = post.alt || "";
      figure.append(img);
      body.append(figure);
    }

    appendPostContent(body, post.content);

    if (post.tags?.length) {
      const tagWrap = createElement("div", "post-tags");
      post.tags.forEach((tag) => tagWrap.append(createElement("span", "", tag)));
      body.append(tagWrap);
    }

    detail.replaceChildren(body);
    renderRelatedPosts(posts, post);
  } catch (error) {
    console.error(error);
    renderNotFoundPost();
  }
};

const initPosts = () => {
  renderListingPage();
  renderPostDetailPage();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPosts, { once: true });
} else {
  initPosts();
}
