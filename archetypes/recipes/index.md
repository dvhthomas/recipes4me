---
title: {{ replace .Name "-" " " | title }}
date: {{ .Date }}
summary: |-
  What's the story behind this recipe?
draft: true
images: []
# Recipe author
author:
  name: ""
  url: ""
# Recipe taxonomies
cuisines: []    # e.g., ["Italian"], ["Thai", "Asian"]
categories: []  # e.g., ["Dinner"], ["Dessert", "Baking"]
diets: []       # e.g., ["Vegetarian"], ["Vegan", "Gluten-Free"]
# Recipe metadata
prepTime: "PT15M"    # ISO8601 duration: PT15M = 15 minutes
cookTime: "PT30M"    # PT30M = 30 minutes, PT1H = 1 hour
totalTime: "PT45M"   # PT45M = 45 minutes
yield: 4
yieldUnit: "servings"
difficulty: "Easy"   # Easy, Intermediate, Advanced
---

Brief introduction or story about this recipe.

{{< recipe >}}

### Ingredients

{{< ingredients >}}
- 2 cups ingredient one
- 1 cup ingredient two
- 1 tsp seasoning or spice
- Salt and pepper to taste
{{< /ingredients >}}

### Instructions

{{< instructions >}}

**Prep your ingredients:** Get everything ready before you start cooking.

**Cook the base:** Describe the technique, temperature, and timing.

**Combine and finish:** Bring everything together. Adjust seasoning and serve.

{{< /instructions >}}

### Notes

**Storage:** How to store leftovers and how long they keep.

**Variations:** Ideas for substitutions or alternative ingredients.

**Tips:** Any helpful tricks or things to watch out for.

{{< /recipe >}}
