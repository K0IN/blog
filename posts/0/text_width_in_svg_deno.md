---
title: Measuring SVG Text Width in Deno
date: 2025-08-03
description: A guide to getting the text width in SVG using Deno.
layout: post
tags:
  - Deno
  - SVG
---

## The challenge (no canvas in Deno) and why you'd care about SVG text measurement

While building a [serverless SVG badge generator in Deno](https://github.com/K0IN/can-i-use-embed), I ran into a fun challenge: how do you measure the width of text in an SVG... when Deno doesn’t support Canvas?

The badges show browser compatibility info as inline SVG images. \
To layout the badge properly, I needed to calculate how wide the label and value text would be—dynamically. \
Unfortunately, SVG doesn't have a layout engine, and Deno doesn't have a native [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) (see [issue](https://github.com/denoland/deno/issues/5701)).

Since I was using a custom font, rough width estimates wouldn't cut it. I needed something precise.

## Failed Starts & the Solution

I first explored canvas polyfills like [canvaskit](https://jsr.io/@josefabio/deno-canvas), which exposes a Skia-backed Canvas API in Deno via WebAssembly. \
It worked—but even after loading the font, measurements were off by a few pixels.

Then I found [`text-to-svg`](https://www.npmjs.com/package/text-to-svg), a library that parses fonts and calculates dimensions [directly from glyph](https://github.com/shrhdk/text-to-svg/blob/ed0692882908511bcc377069e55853492d5e1429/src/index.js#L40) metrics, no canvas needed. \
This also makes it way more lightweight than a full canvas polyfill, which is great for serverless environments. \
So after some tests I settled on it as the best solution to measure text width in SVG. \
Here's how I implemented it:

```ts
import text2svg from "npm:text-to-svg";

const textSvg = text2svg.loadSync("Roboto.otf");

export function getTextSize(
  text: string,
  fontSize = 16,
  fontFamily = "Roboto"
): { width: number; height: number } {
  const metrics = textSvg.getMetrics(text, {
    x: 0,
    y: 0,
    fontSize,
    fontFamily,
    anchor: "top",
    attributes: { fill: "black" },
  });

  return {
    width: metrics.width,
    height: metrics.height,
  };
}
```

I converted my font to otf, but any of OTF, TTF and WOFF should work too.

## Final Thoughts

If you’re working with SVG in Deno and need to measure text size, you should really try out [`text-to-svg`](https://www.npmjs.com/package/text-to-svg).
