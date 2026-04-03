// =============================
// Recipe Search — Client-side with Fuse.js
// =============================

const QUALITY_SCORE_THRESHOLD = 0.88;

const fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  includeScore: true,
  threshold: 0.2,
  ignoreLocation: true,
  minMatchCharLength: 3,
  keys: [
    { name: "title", weight: 2 },
    { name: "summary", weight: 1.5 },
    { name: "cuisines", weight: 1 },
    { name: "categories", weight: 1 },
    { name: "diets", weight: 1 },
    { name: "contents", weight: 0.5 },
  ],
};

let fuseIndex = null;
let allRecipes = null;

const loadIndex = () => {
  if (fuseIndex) return Promise.resolve(fuseIndex);

  return fetch("/index.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.json();
    })
    .then((pages) => {
      allRecipes = pages;
      fuseIndex = new Fuse(pages, fuseOptions);
      return fuseIndex;
    });
};

const executeSearch = (query) => {
  const resultsContainer = document.getElementById("search-results");
  const recipeGrid = document.getElementById("recipe-grid");

  if (!query.trim()) {
    resultsContainer.innerHTML = "";
    resultsContainer.style.display = "none";
    recipeGrid.style.display = "";
    return;
  }

  loadIndex()
    .then((fuse) => {
      const results = fuse.search(query);
      const filtered = results.filter((r) => r.score <= QUALITY_SCORE_THRESHOLD);

      recipeGrid.style.display = "none";
      resultsContainer.style.display = "";

      if (filtered.length === 0) {
        resultsContainer.innerHTML =
          '<p class="search-empty">No recipes found. Try a different search.</p>';
        return;
      }

      const seen = new Set();
      const unique = filtered.filter((r) => {
        if (seen.has(r.item.permalink)) return false;
        seen.add(r.item.permalink);
        return true;
      });

      resultsContainer.innerHTML =
        '<p class="search-count">' + unique.length + " recipe" + (unique.length === 1 ? "" : "s") + ' found</p>' +
        '<div class="recipe-grid">' +
        unique.map((r) => buildCard(r.item)).join("") +
        "</div>";

      // Highlight matches
      const marker = new Mark(resultsContainer);
      marker.mark(query);
    })
    .catch((err) => {
      console.error("Search error:", err);
      resultsContainer.innerHTML =
        '<p class="search-empty">Search failed. Please try again.</p>';
    });
};

const buildCard = (recipe) => {
  const time = recipe.totalTime
    ? recipe.totalTime.replace(/^PT/, "").replace("H", "h ").replace("M", "m").trim()
    : "";
  const yieldStr =
    recipe.yield && recipe.yieldUnit
      ? `${recipe.yield} ${recipe.yieldUnit}`
      : "";
  const difficulty = recipe.difficulty || "";

  const metaItems = [time, yieldStr, difficulty].filter(Boolean);
  const metaHtml = metaItems.length
    ? '<div class="card-meta">' +
      metaItems.map((m) => `<span>${m}</span>`).join("") +
      "</div>"
    : "";

  const cuisineTags = (recipe.cuisines || [])
    .map((c) => `<span class="tag tag-cuisine">${c}</span>`)
    .join("");
  const categoryTags = (recipe.categories || [])
    .map((c) => `<span class="tag tag-category">${c}</span>`)
    .join("");
  const tagsHtml =
    cuisineTags || categoryTags
      ? '<div class="card-tags">' + cuisineTags + categoryTags + "</div>"
      : "";

  const summaryHtml = recipe.summary
    ? `<p class="card-summary">${recipe.summary}</p>`
    : "";

  return (
    `<a href="${recipe.permalink}" class="recipe-card">` +
    `<h2>${recipe.title}</h2>` +
    summaryHtml +
    metaHtml +
    tagsHtml +
    `</a>`
  );
};

// =============================
// Initialize
// =============================

const searchInput = document.getElementById("recipe-search");
let debounceTimer = null;

const updateUrl = (query) => {
  const url = new URL(window.location);
  if (query.trim()) {
    url.searchParams.set("s", query);
  } else {
    url.searchParams.delete("s");
  }
  history.replaceState(null, "", url);
};

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      updateUrl(e.target.value);
      executeSearch(e.target.value);
    }, 200);
  });

  const searchBtn = document.getElementById("recipe-search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      updateUrl(searchInput.value);
      executeSearch(searchInput.value);
    });
  }

  // Restore search from URL on load
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("s");
  if (initialQuery) {
    searchInput.value = initialQuery;
    executeSearch(initialQuery);
  }

  // Focus search with / key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "/" &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
    ) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}
