import type { StorybookConfig } from '@storybook/sveltekit';

/**
 * One Storybook, four product sections.
 *
 * Separate Storybook instances per division were the other option and would
 * have meant four configs, four dev servers and four places to keep in sync
 * for a set of components that already live in one app. Instead the story
 * tree is grouped by division (`AL.KA/`, `Sleep/`, `Pizza/`, `Water/`), and a
 * decorator in preview.ts dresses each story in its own product's tokens,
 * wrapper class and typefaces. Navigating between sections looks exactly like
 * navigating between the sites.
 *
 * Nothing here enumerates products: adding a division means adding a registry
 * entry and dropping `*.stories.ts` next to the new components.
 */
const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|svelte)'],
	addons: ['@storybook/addon-svelte-csf'],
	framework: { name: '@storybook/sveltekit', options: {} },
	/* The AL.KA shell faces. app.html loads these for the real site and
	   Storybook never sees app.html, so the same three families are requested
	   here. Per-product faces are injected by the decorator from the registry. */
	previewHead: (head) => `
		${head}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500;1,9..144,700;1,9..144,800;1,9..144,900&family=JetBrains+Mono:wght@400;500;700&display=swap"
			rel="stylesheet"
		/>
	`
};

export default config;
