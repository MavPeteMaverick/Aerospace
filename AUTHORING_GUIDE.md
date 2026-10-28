# Authoring Guide

## How to add a new Module

1. Create a JSON file in src/content/modules/ (e.g., my-module.json).
2. Add the required fields: id, moduleNumber, title, eyebrow, summary, description, and order.

## How to add a new Chapter

1. Create an MDX file in src/content/chapters/ (e.g., 01-intro.mdx).
2. Include the required frontmatter: moduleSlug, chapterNumber, title, summary, readingTimeMinutes, whereThisFits, and learningObjectives.

## Useful Components

You can import and use the following components in your MDX files:

- <WorkedExample title="...">...</WorkedExample>
- <WatchOut title="...">...</WatchOut>
- <MediaFigure src="..." alt="..." caption="..." />
- <Recap>...</Recap>
- <CheckUnderstanding>...</CheckUnderstanding>
- <ActionStep>...</ActionStep>

## Cloudflare Pages Setup

- **Build command:** npm run build
- **Build output directory:** dist
