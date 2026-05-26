<script lang="ts">
	import { dict } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import SectionHead from '../SectionHead.svelte';

	const cells = $derived([
		[$dict.labels.head_office, $dict.contact.address],
		[$dict.nav_about, $dict.contact.hours],
		['Email', $dict.contact.email],
		['Tel.', $dict.contact.phone]
	]);
</script>

<section class="contact">
	<SectionHead num="06" kicker={$dict.labels.kicker_contact} title={$dict.section_contact} />
	<div class="wrap">
		<div class="gutter"></div>
		<div class="grid">
			{#each cells as [k, v], i (k + i)}
				<div class="cell reveal-up" class:noright={i === cells.length - 1} use:reveal={{ delay: i * 80 }}>
					<div class="label">{k}</div>
					<div class="val">{v}</div>
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
