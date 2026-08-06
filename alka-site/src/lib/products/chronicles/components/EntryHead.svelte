<script lang="ts">
	import { page } from '$app/state';
	import { entry as lookup } from '$lib/products/chronicles/entries';
	import { absoluteUrl, SITE_NAME } from '$lib/site';

	/**
	 * `<head>` for a chronicles entry.
	 *
	 * The same job `ProductHead` does for a division, against the entry
	 * registry instead of the product one, because an entry is allowed its own
	 * typefaces and favicon and a division's registry has no room for it.
	 *
	 * `article` rather than `website` for og:type: these are dated posts, and
	 * the date is published alongside so a reader (and a crawler) can see how
	 * old the page is.
	 */
	type Props = { slug: string; title: string; description: string };

	let { slug, title, description }: Props = $props();

	const meta = $derived(lookup(slug));
	const canonical = $derived(absoluteUrl(page.url.pathname));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="article:published_time" content={meta.date} />
	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	{#if meta.fontHref}
		<link href={meta.fontHref} rel="stylesheet" />
	{/if}
	{#if meta.iconHref}
		<link rel="icon" href={meta.iconHref} />
	{/if}
</svelte:head>
