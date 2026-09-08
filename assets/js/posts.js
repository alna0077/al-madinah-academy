const POSTS_DATA_URL = "data/posts.json";

const postDateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
const upcomingMonthFormatter = new Intl.DateTimeFormat("en-CA", { month: "short" });
const upcomingDayFormatter = new Intl.DateTimeFormat("en-CA", { day: "numeric" });

const parsePostDate = (dateValue) => new Date(`${dateValue}T12:00:00`);
const sortPublishedPosts = (posts) => [...posts].sort((a, b) => parsePostDate(b.date) - parsePostDate(a.date));
const sortUpcomingItems = (items) => [...items].sort((a, b) => parsePostDate(a.date) - parsePostDate(b.date));

const getTodayKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatPostDate = (dateValue) => {
  const date = parsePostDate(dateValue);
  return Number.isNaN(date.getTime()) ? dateValue : postDateFormatter.format(date);
};

const normalizeItem = (item) => ({
  ...item,
  id: item.id || item.slug || "",
  slug: item.slug || (item.type === "post" ? item.id : ""),
  type: item.type === "upcoming" ? "upcoming" : "post",
  summary: item.summary || item.excerpt || "",
  imageAlt: item.imageAlt || item.alt || ""
});

const selectNewsItems = (items, todayKey = getTodayKey()) => {
  const publishedPosts = sortPublishedPosts(items.filter((item) => item.type === "post"));
  const explicitlyFeatured = publishedPosts.filter((post) => post.featured);
  const featured = explicitlyFeatured[0] || publishedPosts[0];
  return {
    featured,
    latestPosts: publishedPosts.filter((post) => post.id !== featured?.id),
    upcomingItems: sortUpcomingItems(
      items.filter((item) => item.type === "upcoming" && item.date >= todayKey)
    )
  };
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createPostLink = (post) => post.link || `post.html?slug=${encodeURIComponent(post.slug || post.id)}`;

const createPostMeta = (post) => {
  const meta = createElement("div", "post-meta");
  const category = createElement("span", "post-category", post.category || "Update");
  const date = createElement("time", "", formatPostDate(post.date));
  date.dateTime = post.date;
  meta.append(category, date);
  return meta;
};

const createItemImage = (item, link, className) => {
  const imageLink = createElement("a", className);
  imageLink.href = link;
  imageLink.setAttribute("aria-label", `View ${item.title}`);
  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.imageAlt || "";
  image.loading = "lazy";
  image.decoding = "async";
  if (item.imageWidth && item.imageHeight) {
    image.width = item.imageWidth;
    image.height = item.imageHeight;
  }
  imageLink.append(image);
  return imageLink;
};

const createPostCard = (post, options = {}) => {
  const className = options.featured
    ? "post-card post-card-featured"
    : options.related
      ? "post-card post-card-related"
      : "post-card post-card-feed";
  const article = createElement("article", className);
  const link = createPostLink(post);
  if (post.image) article.append(createItemImage(post, link, "post-card-image"));

  const body = createElement("div", "post-card-body");
  body.append(createPostMeta(post));
  const title = createElement(options.featured ? "h3" : "h2");
  const titleLink = document.createElement("a");
  titleLink.href = link;
  titleLink.textContent = post.title;
  title.append(titleLink);
  body.append(title);
  if (post.summary) body.append(createElement("p", "post-excerpt", post.summary));

  const readMore = createElement("a", "btn-link", options.featured ? "View Update" : "Read More");
  readMore.href = link;
  body.append(readMore);
  article.append(body);
  return article;
};

const createUpcomingItem = (item) => {
  const article = createElement("article", "upcoming-item");
  const date = parsePostDate(item.date);
  const dateWrap = createElement("div", "upcoming-date");
  const time = document.createElement("time");
  time.dateTime = item.date;
  if (Number.isNaN(date.getTime())) {
    time.textContent = item.date;
  } else {
    time.append(
      createElement("span", "upcoming-month", upcomingMonthFormatter.format(date)),
      createElement("strong", "upcoming-day", upcomingDayFormatter.format(date))
    );
  }
  dateWrap.append(time);

  const content = createElement("div", "upcoming-content");
  content.append(createElement("p", "upcoming-category", item.category || "Upcoming"));
  content.append(createElement("h3", "", item.title));
  if (item.summary) content.append(createElement("p", "upcoming-summary", item.summary));
  if (item.link) {
    const link = createElement("a", "btn-link", item.linkLabel || "Learn More");
    link.href = item.link;
    content.append(link);
  }
  article.append(dateWrap, content);
  if (item.image) article.append(createItemImage(item, item.link || "#", "upcoming-image"));
  return article;
};

const fetchPosts = async () => {
  const response = await fetch(POSTS_DATA_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error("Unable to load posts data.");
  const items = await response.json();
  if (!Array.isArray(items)) throw new Error("Posts data must be an array.");
  return items.map(normalizeItem);
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

const renderFeaturedPost = (post) => {
  const featuredWrap = document.querySelector("[data-featured-post]");
  if (!featuredWrap) return;
  featuredWrap.replaceChildren(
    post ? createPostCard(post, { featured: true }) : createElement("p", "empty-state", "No featured post is available yet.")
  );
};

const renderUpcomingItems = (items) => {
  const section = document.querySelector("[data-upcoming-section]");
  const list = document.querySelector("[data-upcoming-list]");
  if (!section || !list) return;
  section.hidden = items.length === 0;
  list.replaceChildren(...items.map(createUpcomingItem));
};

const renderListingPage = async () => {
  const list = document.querySelector("[data-posts-list]");
  if (!list) return;
  try {
    const items = await fetchPosts();
    const { featured, latestPosts, upcomingItems } = selectNewsItems(items);

    let activeCategory = "All";
    const applyFilter = (category) => {
      activeCategory = category;
      renderCategoryFilters(latestPosts, activeCategory, applyFilter);
      renderPostsList(latestPosts, activeCategory);
    };

    renderFeaturedPost(featured);
    renderUpcomingItems(upcomingItems);
    renderPostsList(latestPosts, activeCategory);
    renderCategoryFilters(latestPosts, activeCategory, applyFilter);
  } catch (error) {
    console.error(error);
    list.replaceChildren(createElement("p", "empty-state", "Updates could not be loaded. Please check data/posts.json."));
  }
};

const appendPostContent = (container, content = []) => {
  const items = Array.isArray(content) ? content : [content];
  items.forEach((item) => {
    if (typeof item === "string") {
      container.append(createElement("p", "", item));
    } else if (item?.type === "heading") {
      container.append(createElement("h2", "", item.text || ""));
    } else if (item?.type === "list" && Array.isArray(item.items)) {
      const list = document.createElement("ul");
      item.items.forEach((listItem) => list.append(createElement("li", "", listItem)));
      container.append(list);
    }
  });
};

const renderRelatedPosts = (posts, currentPost) => {
  const wrap = document.querySelector("[data-related-posts]");
  if (!wrap) return;
  const candidates = posts.filter((post) => post.id !== currentPost.id);
  let related = candidates
    .filter((post) => post.category === currentPost.category || post.tags?.some((tag) => currentPost.tags?.includes(tag)))
    .slice(0, 2);
  if (!related.length) related = candidates.slice(0, 2);

  wrap.replaceChildren();
  wrap.hidden = related.length === 0;
  if (!related.length) return;
  const heading = createElement("div", "related-posts-heading");
  heading.append(createElement("p", "eyebrow", "Continue Reading"), createElement("h2", "", "More academy updates"));
  const list = createElement("div", "related-posts-list");
  related.forEach((post) => list.append(createPostCard(post, { related: true })));
  wrap.append(heading, list);
};

const renderNotFoundPost = () => {
  const title = document.querySelector("[data-post-title]");
  const excerpt = document.querySelector("[data-post-excerpt]");
  const category = document.querySelector("[data-post-category]");
  const detail = document.querySelector("[data-post-detail]");
  if (category) category.textContent = "Not Found";
  if (title) title.textContent = "This academy update could not be found.";
  if (excerpt) excerpt.textContent = "The post may have moved, or the address may be incorrect.";
  if (detail) {
    const message = createElement("div", "empty-state");
    message.append(createElement("h2", "", "Post not found"), createElement("p", "", "Return to News & Updates to browse all available posts."));
    const link = createElement("a", "btn btn-primary", "Back to News & Updates");
    link.href = "news.html";
    message.append(link);
    detail.replaceChildren(message);
  }
};

const renderPostDetailPage = async () => {
  const detail = document.querySelector("[data-post-detail]");
  if (!detail) return;
  try {
    const items = await fetchPosts();
    const posts = sortPublishedPosts(items.filter((item) => item.type === "post"));
    const slug = new URLSearchParams(window.location.search).get("slug");
    const post = posts.find((item) => item.slug === slug || item.id === slug);
    if (!post) {
      renderNotFoundPost();
      return;
    }

    document.title = `${post.title} | Al-Madinah Quran and Sunnah Academy`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", post.summary || "Al-Madinah Academy update.");
    document.querySelector("[data-post-category]").textContent = post.category || "Academy Update";
    document.querySelector("[data-post-title]").textContent = post.title;
    document.querySelector("[data-post-excerpt]").textContent = post.summary || "";
    const date = document.querySelector("[data-post-date]");
    if (date) {
      date.textContent = formatPostDate(post.date);
      date.dateTime = post.date;
    }

    const body = createElement("div", "post-content");
    if (post.image) {
      const figure = createElement("figure", "post-hero-image");
      const image = document.createElement("img");
      image.src = post.image;
      image.alt = post.imageAlt || "";
      image.loading = "lazy";
      image.decoding = "async";
      if (post.imageWidth && post.imageHeight) {
        image.width = post.imageWidth;
        image.height = post.imageHeight;
      }
      figure.append(image);
      body.append(figure);
    }
    appendPostContent(body, post.content);

    if (post.tags?.length) {
      const tagWrap = createElement("div", "post-tags");
      tagWrap.setAttribute("aria-label", "Topics");
      post.tags.forEach((tag) => tagWrap.append(createElement("span", "", tag)));
      body.append(tagWrap);
    }
    const returnLink = createElement("a", "post-return-link post-return-link-bottom", "Back to News & Updates");
    returnLink.href = "news.html";
    body.append(returnLink);
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
