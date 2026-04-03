# Recipes For Me

Kitchen-tested recipes by Dylan Thomas, built with [Hugo](https://gohugo.io/).

## Prerequisites

**Hugo** (static site generator):

```sh
brew install hugo
```

Or see https://gohugo.io/installation/ for other platforms.

**Image compression tools** (used by `./squish`):

```sh
brew install pngquant oxipng jpegoptim
```

- `pngquant` — lossy PNG compression
- `oxipng` — lossless PNG optimization (applied after pngquant)
- `jpegoptim` — JPEG compression and stripping

On Linux (apt): `sudo apt install pngquant jpegoptim && cargo install oxipng`

## Adding a New Recipe

```sh
hugo new content recipes/my-recipe-name
```

This creates a page bundle at `content/recipes/my-recipe-name/index.md` with all the frontmatter fields pre-filled. Drop any images into the same directory, set `draft: false` when ready, and it will appear on the site.

## Development

Start the local development server:

```sh
hugo serve
```

The site will be available at http://localhost:1313/. Changes to content and layouts will live-reload automatically.

## Image Compression

Before committing new recipe images, compress them with `./squish` to keep the repo lean:

```sh
./squish content/recipes/tomato-soup         # Dry run — show sizes and what will change
./squish content/recipes/tomato-soup --now   # Resize (max 1600px wide) and compress
./squish content/recipes/tomato-soup --clean # Replace originals with compressed versions
```

Images wider than 1600px are automatically resized down before compression.

## Build

Generate the production site:

```sh
hugo
```

Output will be in the `public/` directory.
