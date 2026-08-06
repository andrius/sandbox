<script lang="ts">
	import { dict } from '$lib/products/alka/i18n';
	import { reveal } from '$lib/actions/reveal';
	import SectionHead from '$lib/products/alka/components/SectionHead.svelte';
	import Portrait from '$lib/products/alka/components/Portrait.svelte';
</script>

<section class="team">
	<SectionHead num="04" kicker={$dict.labels.kicker_team} title={$dict.section_team} />
	<div class="wrap">
		<div class="gutter"></div>
		<div class="cards">
			{#each $dict.team as p, i (p.name + i)}
				<article class="card reveal-up" use:reveal={{ delay: i * 90 }}>
					<div class="ledger">
						<span>№ 0{i + 1}</span>
						<span class="age">{$dict.labels.age_short}&nbsp;{p.age}</span>
					</div>
					<div class="portrait">
						<Portrait kind={p.portrait} size={134} accent="#ff7a1a" />
					</div>
					<h3 class="name">{p.name}</h3>
					<div class="title">{p.title}</div>
					<p class="bio">{p.bio}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.team {
		padding: var(--s-section-y) var(--s-section-x);
		background: var(--paper);
		border-bottom: 1px solid var(--rule);
	}

	.wrap {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
	}

	/* Was `repeat(5, 1fr)`. At 1024px that gave each of the five cards 133px to
	   hold a 134px portrait, so the row overflowed before a single word of copy
	   was measured. `auto-fit` keeps the five-across row wherever there is room
	   for it - which is every width the design was drawn at - and drops to four
	   or three when there is not, instead of pushing the page sideways. */
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(168px, 100%), 1fr));
		gap: 24px;
	}

	.card {
		background: var(--bg);
		padding: 20px 18px 24px;
		border: 1px solid var(--rule);
		position: relative;
		transition:
			transform 360ms var(--ease-out),
			box-shadow 360ms var(--ease-out);
	}
	.card:hover {
		transform: translateY(-4px);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.ledger {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--dim);
		letter-spacing: 0.16em;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--rule);
		margin-bottom: 16px;
	}

	.age { color: var(--orng-text); }

	.portrait {
		display: flex;
		justify-content: center;
		margin-bottom: 14px;
	}

	.name {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 19px;
		line-height: 1.15;
		margin: 0 0 6px;
		color: var(--ink);
		letter-spacing: -0.01em;
	}

	.title {
		font-family: var(--font-sans);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--orng-text);
		font-weight: 700;
		margin-bottom: 12px;
		line-height: 1.3;
	}

	.bio {
		font-family: var(--font-sans);
		font-size: 13px;
		line-height: 1.5;
		color: var(--ink);
		opacity: 0.8;
		margin: 0;
	}

	@media (max-width: 1023px) {
		.wrap { grid-template-columns: 80px 1fr; gap: 24px; }
		.cards { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
	}

	@media (max-width: 639px) {
		.wrap { grid-template-columns: 1fr; }
		.gutter { display: none; }
		.cards { grid-template-columns: 1fr; }
	}
</style>
