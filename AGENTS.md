# Agents

## Images

Before committing any new or modified images, always run `./squish` to compress them:

```sh
./squish content/recipes/my-recipe    # Dry run — shows sizes and what will change
./squish content/recipes/my-recipe --now   # Resize (max 1600px wide) and compress
./squish content/recipes/my-recipe --clean # Replace originals with compressed versions
```

The `--clean` step is interactive and may need manual confirmation. If it fails, manually replace the original with the squished file (e.g., `mv image-squished.jpg image.jpg`).

Do NOT commit uncompressed images. Large images bloat the git repo permanently.

## Theming

All site colors are derived from a single `--hue` CSS variable in `:root`. Secondary and tertiary colors use `calc()` offsets from this hue. All colors use HSLA — never add hardcoded hex values. To re-theme the site, change only `--hue`.

## Recipes

### Ingredient Grouping

When creating or editing recipes, group ingredients under `h4` headings inside the `{{< ingredients >}}` shortcode. Groups should make grocery shopping easier by keeping similar items together.

Use these groups (in this order, skip any that are empty):

- **Meat & Seafood** — chicken, beef, pork, sausage, bacon, fish, shrimp
- **Produce** — vegetables, fruits, and fresh herbs: onions, carrots, celery, potatoes, limes, tomatoes, garlic, ginger, chillies, dill, basil, cilantro, mint, parsley, thyme, rosemary
- **Dairy & Eggs** — butter, cream, sour cream, milk, eggs, cheese, coconut cream
- **Pantry** — oils, flour, sugar, canned goods, broth, sauces, condiments, vinegar, pickles, dried spices, salt, pepper, baking powder
- **Frozen** — frozen vegetables, frozen fruits
- **Other** — anything that doesn't clearly fit the above groups

### STRICT: Never remove ingredients

- When reorganizing ingredients into groups, every single ingredient from the original recipe MUST be preserved. Do not drop, merge, or reword ingredients. If you are unsure which group an ingredient belongs to, put it in **Other**.
- Always give proper attribution to the original recipe author and link to the original recipe if it's available online.
