# Agents

## Recipes

### Scaffolding a new recipe

Always start a new recipe with the Hugo archetype — never hand-write the file. The archetype lives at `archetypes/recipes/index.md` and pre-fills every frontmatter field plus the body skeleton.

```sh
hugo new content recipes/my-recipe-name
```

This creates a page bundle at `content/recipes/my-recipe-name/index.md`. The slug becomes the URL (`/recipes/my-recipe-name`), so pick a short, descriptive, kebab-case name. Drop images into the same directory — they are referenced relatively, not from `static/`.

Preview locally with `hugo serve` (live-reloads on save) and only flip `draft: false` when the recipe is tested and ready to publish.

### Frontmatter

Fields the archetype pre-fills, with what each one needs:

- **`title`** — title-case, with apostrophes if needed (`Shepherd's Pie`, not `Shepherds Pie`).
- **`date`** — leave the auto-filled timestamp from `hugo new`. Don't backdate.
- **`summary`** — 1–2 sentences. The first sentence shows on listing pages; the second adds flavor on the recipe page. Use the `|-` block scalar so multi-line copy renders cleanly.
- **`draft`** — keep `true` until the recipe is tested and ready.
- **`images`** — array of filenames in the bundle (e.g. `[shepherds-pie.jpg]`). Used for OpenGraph/Twitter cards.
- **`author`** — `name` and `url` of the original recipe creator. **Always credit the source** if the recipe is adapted. Leave both empty strings only for fully original recipes.
- **`cuisines`** — broad regional/cultural buckets. Examples: `[Italian]`, `[Thai, Asian]`, `[British, Irish]`. Title-case.
- **`categories`** — meal/course buckets. Examples: `[Dinner]`, `[Dinner, Main Course]`, `[Dessert, Baking]`, `[Side]`, `[Breakfast]`. Title-case.
- **`diets`** — dietary attributes that genuinely apply. Examples: `[Vegetarian]`, `[Vegan, Gluten-Free]`. Empty array if none apply.
- **`prepTime` / `cookTime` / `totalTime`** — ISO 8601 durations. `PT15M` = 15 min, `PT1H` = 1 hour, `PT1H15M` = 1 hour 15 min. `totalTime` should equal prep + cook (plus any rest/marinate time).
- **`yield`** + **`yieldUnit`** — integer count and the unit you'd say out loud: `4` + `"servings"`, `12` + `"cookies"`, `1` + `"loaf"`.
- **`difficulty`** — exactly one of `Easy`, `Intermediate`, `Advanced`. Be honest: a recipe with multiple sub-techniques (e.g. mise-en-place a sauce while braising) is `Intermediate`, not `Easy`.

Cuisines, categories, and diets feed Hugo taxonomies, so existing values are linked across recipes. Reuse exact strings that already appear in other recipes when they fit (browse `content/recipes/*/index.md` to check) — `Dinner` and `dinner` would create two separate taxonomy pages.

### Body structure

Every recipe body follows the same skeleton, all wrapped in the `{{< recipe >}}` shortcode (which the schema.org structured data depends on):

````markdown
Brief intro paragraph(s). Story, why you make it this way, what's adapted from where.

{{< recipe >}}

### Ingredients

{{< ingredients >}}
#### Group Name
- ingredient
{{< /ingredients >}}

### Instructions

{{< instructions >}}

#### Optional sub-section heading

**Step verb-phrase:** Step body.

{{< /instructions >}}

### Notes

**Storage:** ...
**Tips:** ...

{{< /recipe >}}
````

The intro sits **before** `{{< recipe >}}` so it doesn't get swept into the structured-data block. Insert the hero image right above `{{< recipe >}}`:

```markdown
![Recipe Name](recipe-name.jpg?w=800)
```

The `?w=800` query string is honored by the image processing pipeline.

### Ingredients

Ingredients live inside `{{< ingredients >}} ... {{< /ingredients >}}` and **must** be grouped under `####` (h4) headings. Groups make grocery shopping easier by clustering items by store section.

Use these groups in this order, skipping any that are empty:

- **Meat & Seafood** — chicken, beef, pork, sausage, bacon, fish, shrimp
- **Produce** — vegetables, fruits, and fresh herbs: onions, carrots, celery, potatoes, limes, tomatoes, garlic, ginger, chillies, dill, basil, cilantro, mint, parsley, thyme, rosemary
- **Dairy & Eggs** — butter, cream, sour cream, milk, eggs, cheese, coconut cream
- **Pantry** — oils, flour, sugar, canned goods, broth, sauces, condiments, vinegar, pickles, dried spices, salt, pepper, baking powder
- **Frozen** — frozen vegetables, frozen fruits
- **Other** — anything that doesn't clearly fit the above groups

Each ingredient is a `-` bullet. Include both US and metric where it helps precision: `4 lb (1.8kg) Yukon Gold potatoes`, `1 cup (240ml) whole milk`. If the same ingredient appears in two parts of the recipe at different quantities, list it twice with parenthetical context: `2 tbsp unsalted butter (for the filling)` and `1 cup (226g) unsalted butter, cubed (for the potatoes)`.

**STRICT — never silently drop ingredients.** When reorganizing an existing recipe into groups, every single ingredient from the source must be preserved. Do not merge, drop, or reword. If unsure where an ingredient belongs, put it in **Other**.

### Instructions

Instructions live inside `{{< instructions >}} ... {{< /instructions >}}`. The shortcode parses each `**Bold prefix:**` paragraph as a single step, so structure matters:

- **Use bold verb-prefix steps**, not numbered lists. Each step starts with a short imperative phrase, a colon, and the body: `**Sweat the aromatics:** In a large oven-safe skillet, melt 2 tablespoons of butter...`
- **Group long recipes with `####` (h4) sub-sections** — e.g. `#### Make the velvety mashed potatoes`, `#### Build the filling`, `#### Assemble and bake`. Skip sub-sections for short recipes.
- **Be specific.** Include pan size, heat level, time range, and the visual/sensory cue (`until softened but still with a little bite`, `until deeply golden brown`).
- **Mirror ingredient quantities** when a step uses a portion of a divided ingredient: `Add the remaining 4 teaspoons of salt`.
- Don't use numbered lists (`1.`, `2.`) — the bold-prefix pattern is what the layout expects.

### Notes

The `### Notes` section is freeform but conventionally uses these bold-prefix headings:

- **Storage:** how leftovers keep, reheat instructions.
- **Variations:** substitutions or alternative ingredients.
- **Tips:** helpful tricks or pitfalls — including your personal modifications from the source recipe.

Skip any of these that you don't have something useful to say about. Don't pad.

### Attribution

If the recipe is adapted from a cookbook, video, or website, credit the source:

- Fill in `author.name` and `author.url` in frontmatter.
- Mention the source in the intro paragraph with a markdown link to the original where it exists online: `[*Knife Drop*](https://www.nickdigiovanni.com/) by Nick DiGiovanni (Meat, p. 141)`.
- In **Tips**, call out what you changed: `I skipped the beer in Nick's recipe`. This is genuinely useful to readers and honest about the lineage.

### Units & conversions

When a quantity matters (baking, sauces, doughs), include both US and metric. The reference page at `content/recipes/units/index.md` is the canonical source for conversions used across the site — reuse the same gram values it uses (e.g. 1 cup AP flour = 120g) so recipes are internally consistent.

## Images

Drop images into the recipe's page bundle (`content/recipes/my-recipe/`). Reference them with relative markdown image syntax, including the resize query string:

```markdown
![Description](my-recipe.jpg?w=800)
```

**Before committing any new or modified images, always run `./squish` to compress them:**

```sh
./squish content/recipes/my-recipe --now    # Resize (max 1600px wide) and compress
./squish content/recipes/my-recipe --clean  # Replace originals with compressed versions
```

The required `--clean` step is interactive and may need manual confirmation.
If it fails, manually replace the original with the squished file (e.g., `mv image-squished.jpg image.jpg`).

Do NOT commit uncompressed images. Large images bloat the git repo permanently.

## Theming

All site colors are derived from a single `--hue` CSS variable in `:root`. Secondary and tertiary colors use `calc()` offsets from this hue. All colors use HSLA — never add hardcoded hex values. To re-theme the site, change only `--hue`.

## Hugo commands cheat sheet

```sh
hugo new content recipes/my-recipe-name   # Scaffold a new recipe from the archetype
hugo serve                                # Local dev server with live reload at :1313
hugo                                      # Production build into public/
```
