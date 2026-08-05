import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Tailwind is imported without Preflight (see src/app.css) and is used by the
// /pizza route only. It must run before sveltekit() so utilities are generated
// from the .svelte sources.
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
