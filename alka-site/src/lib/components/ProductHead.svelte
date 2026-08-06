<script lang="ts">
	import { page } from '$app/state';
	import { product as lookup, type ProductId } from '$lib/products/registry';
	import { absoluteUrl, SITE_NAME } from '$lib/site';

	/**
	 * The `<head>` half of a product page.
	 *
	 * Products share no visual language, but they all need the same six tags,
	 * and two of them (the font stylesheet and the favicon override) are facts
	 * the registry already knows. Emitting them from here means a product
	 * declares its faces once, in `registry.ts`, instead of repeating the
	 * Google Fonts URL in every route it owns - `/pizza` and `/pizza/checkout`
	 * had drifted into carrying two copies of the same link.
	 *
	 * Products keep their own wrapper element rather than getting one from
	 * here: `/pizza` needs a div wrapping header + main + footer for its
	 * layout, `/water` and `/sleep` want the class on `<main>` itself, and
	 * hiding that behind a prop bought nothing.
	 *
	 * Every prop is optional because a product with several routes wants the
	 * two halves in different places. Pizza mounts `<ProductHead id="pizza" />`
	 * once in its `+layout.svelte` so the landing page and the checkout share
	 * one font request, and each page mounts `<ProductHead title=… />` for its
	 * own meta. Single-route products pass everything at once.
	 *
	 * `id` is omitted for the AL.KA menu at `/`, which is the shell rather
	 * than a division and dresses itself in the faces app.html already loads.
	 */
	type Props = {
		id?: ProductId;
		title?: string;
		description?: string;
		/** `soon` divisions have real content but nothing worth indexing yet. */
		noindex?: boolean;
	};

	let { id, title, description, noindex = false }: Props = $props();

	const meta = $derived(id ? lookup(id) : undefined);
	const canonical = $derived(absoluteUrl(page.url.pathname));
</script>

<svelte:head>
	<!-- Guarded because the font-only call site (a product layout) passes no
	     copy, and an unguarded `<title>{undefined}</title>` there would blank
	     the title its own page had just set. -->
	{#if title}
		<title>{title}</title>
		<meta property="og:title" content={title} />
	{/if}
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
	{/if}
	{#if title || description}
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content={SITE_NAME} />
		<link rel="canonical" href={canonical} />
		<meta property="og:url" content={canonical} />
	{/if}
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}
	{#if meta?.fontHref}
		<link href={meta.fontHref} rel="stylesheet" />
	{/if}
	{#if meta?.iconHref}
		<link rel="icon" href={meta.iconHref} />
	{/if}
</svelte:head>
