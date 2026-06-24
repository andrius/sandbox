// @ts-check
import { defineConfig } from 'astro/config';

// Static landing page deployed to Cloudflare as static assets behind a Worker.
export default defineConfig({
  site: 'https://wet-water.c0.lt',
  build: { inlineStylesheets: 'auto' },
});
