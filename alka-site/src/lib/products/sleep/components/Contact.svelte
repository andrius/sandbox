<script lang="ts">
	import { dict } from '$lib/products/alka/i18n';
	import { reveal } from '$lib/actions/reveal';
	import SectionHead from '$lib/products/alka/components/SectionHead.svelte';

	/* The hours cell used to be labelled with `nav_about` ("О компании" /
	   "Over ons") - a leftover that titled the opening hours "About us" in
	   every language. It has its own label now. */
	const cells = $derived([
		{ label: $dict.labels.head_office, value: $dict.contact.address, href: null },
		{ label: $dict.labels.hours, value: $dict.contact.hours, href: null },
		{
			label: $dict.labels.email,
			value: $dict.contact.email,
			href: `mailto:${$dict.contact.email}`
		},
		{ label: $dict.labels.note, value: $dict.contact.phone, href: null }
	]);
</script>

<section class="contact">
	<SectionHead num="06" kicker={$dict.labels.kicker_contact} title={$dict.section_contact} />
	<div class="wrap">
		<div class="gutter"></div>
		<div class="grid">
			{#each cells as cell, i (cell.label + i)}
				<div class="cell reveal-up" class:noright={i === cells.length - 1} use:reveal={{ delay: i * 80 }}>
					<div class="label">{cell.label}</div>
					{#if cell.href}
						<a class="val link" href={cell.href}>{cell.value}</a>
					{:else}
						<div class="val">{cell.value}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.contact {
		padding: var(--s-section-y) var(--s-section-x);
		border-bottom: 1px solid var(--rule);
	}

	.wrap {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
	}

	.cell {
		padding: 28px 24px;
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		border-right: 1px solid var(--rule);
	}
	.cell.noright { border-right: none; }

	.label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--orng-text);
		font-weight: 700;
		margin-bottom: 14px;
	}

	.val {
		font-family: var(--font-sans);
		font-weight: 500;
		font-size: 17px;
		line-height: 1.45;
		color: var(--ink);
		white-space: pre-line;
		display: block;
	}

	.link {
		color: var(--orng-text);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		transition: color 200ms var(--ease-out);
	}
	.link:hover { color: var(--ink); }
	.link:focus-visible {
		outline: 2px solid var(--orng-text);
		outline-offset: 3px;
	}

	@media (max-width: 1023px) {
		.wrap { grid-template-columns: 80px 1fr; gap: 24px; }
		.grid { grid-template-columns: repeat(2, 1fr); }
		.cell:nth-child(2n) { border-right: none; }
		.cell:nth-child(2n+1) { border-right: 1px solid var(--rule); }
		.cell:nth-child(-n+2) { border-bottom: none; }
	}
	@media (max-width: 639px) {
		.wrap { grid-template-columns: 1fr; }
		.gutter { display: none; }
		.grid { grid-template-columns: 1fr; }
		.cell {
			border-right: none !important;
			border-bottom: none !important;
		}
		.cell:last-child { border-bottom: 1px solid var(--rule) !important; }
	}
</style>
