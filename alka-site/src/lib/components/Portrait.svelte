<script lang="ts">
	import type { PortraitKind } from '$lib/i18n/types';

	type Props = {
		kind: PortraitKind;
		size?: number;
		accent?: string;
		fg?: string;
	};

	let { kind, size = 134, accent = '#ff7a1a', fg = '#140a05' }: Props = $props();
</script>

{#if kind === 'kid'}
	<svg
		width={size}
		height={size * 1.2}
		viewBox="0 0 200 240"
		xmlns="http://www.w3.org/2000/svg"
		style="display:block"
		aria-hidden="true"
	>
		<path d="M 20 240 Q 50 180 100 180 Q 150 180 180 240 Z" fill={accent} stroke={fg} stroke-width="3" />
		<path d="M 70 180 Q 100 195 130 180" stroke={fg} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
		<rect x="88" y="160" width="24" height="22" fill="#f4c79b" stroke={fg} stroke-width="3" />
		<circle cx="100" cy="110" r="56" fill="#f4c79b" stroke={fg} stroke-width="3" />
		<path d="M 46 102 Q 50 50 100 48 Q 150 50 154 100 Q 148 78 130 76 Q 110 88 86 78 Q 64 76 56 96 Z" fill="#3a2418" stroke={fg} stroke-width="3" />
		<path d="M 70 60 Q 80 50 92 56" stroke={fg} stroke-width="2" fill="none" />
		<circle cx="82" cy="112" r="4" fill={fg} />
		<circle cx="118" cy="112" r="4" fill={fg} />
		<circle cx="72" cy="128" r="6" fill={accent} opacity="0.45" />
		<circle cx="128" cy="128" r="6" fill={accent} opacity="0.45" />
		<path d="M 84 138 Q 100 150 116 138" stroke={fg} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
	</svg>
{:else if kind === 'bear'}
	<svg
		width={size}
		height={size * 1.2}
		viewBox="0 0 200 240"
		xmlns="http://www.w3.org/2000/svg"
		style="display:block"
		aria-hidden="true"
	>
		<path d="M 30 240 Q 40 180 100 180 Q 160 180 170 240 Z" fill="#a06a3a" stroke={fg} stroke-width="3" />
		<path d="M 80 180 L 70 172 L 70 188 Z M 120 180 L 130 172 L 130 188 Z" fill={accent} stroke={fg} stroke-width="2" />
		<rect x="92" y="174" width="16" height="12" fill={accent} stroke={fg} stroke-width="2" />
		<circle cx="52" cy="60" r="20" fill="#a06a3a" stroke={fg} stroke-width="3" />
		<circle cx="148" cy="60" r="20" fill="#a06a3a" stroke={fg} stroke-width="3" />
		<circle cx="52" cy="60" r="10" fill="#d9b78a" />
		<circle cx="148" cy="60" r="10" fill="#d9b78a" />
		<circle cx="100" cy="105" r="58" fill="#a06a3a" stroke={fg} stroke-width="3" />
		<ellipse cx="100" cy="128" rx="30" ry="22" fill="#d9b78a" stroke={fg} stroke-width="3" />
		<circle cx="80" cy="100" r="5" fill={fg} />
		<circle cx="120" cy="100" r="5" fill={fg} />
		<ellipse cx="100" cy="120" rx="7" ry="5" fill={fg} />
		<path d="M 100 125 L 100 134 M 100 134 Q 92 142 86 138 M 100 134 Q 108 142 114 138" stroke={fg} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
	</svg>
{:else if kind === 'pillow'}
	<svg
		width={size}
		height={size * 1.2}
		viewBox="0 0 200 240"
		xmlns="http://www.w3.org/2000/svg"
		style="display:block"
		aria-hidden="true"
	>
		<path
			d="M 30 60 Q 26 56 30 50 Q 100 28 170 50 Q 174 56 170 60 Q 188 130 170 200 Q 174 206 170 210 Q 100 230 30 210 Q 26 206 30 200 Q 12 130 30 60 Z"
			fill="#f6efde"
			stroke={fg}
			stroke-width="3"
		/>
		<circle cx="28" cy="55" r="6" fill={accent} />
		<circle cx="172" cy="55" r="6" fill={accent} />
		<circle cx="28" cy="205" r="6" fill={accent} />
		<circle cx="172" cy="205" r="6" fill={accent} />
		<path d="M 70 122 Q 80 132 90 122" stroke={fg} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
		<path d="M 110 122 Q 120 132 130 122" stroke={fg} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
		<text x="100" y="100" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="22" fill={fg}>z z z</text>
		<path d="M 88 150 Q 100 158 112 150" stroke={fg} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
		<text x="100" y="190" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="14" fill={fg} opacity="0.55">A K</text>
	</svg>
{:else if kind === 'sausage'}
	<svg
		width={size}
		height={size * 1.2}
		viewBox="0 0 200 240"
		xmlns="http://www.w3.org/2000/svg"
		style="display:block"
		aria-hidden="true"
	>
		<rect x="40" y="40" width="120" height="180" rx="60" fill="#b85432" stroke={fg} stroke-width="3" />
		<path d="M 50 80 Q 100 70 150 80" stroke="#7a2208" stroke-width="2" fill="none" opacity="0.6" />
		<path d="M 50 180 Q 100 170 150 180" stroke="#7a2208" stroke-width="2" fill="none" opacity="0.6" />
		<path d="M 92 92 L 100 86 L 108 92 L 116 120 L 100 130 L 84 120 Z" fill={accent} stroke={fg} stroke-width="2" />
		<circle cx="82" cy="76" r="5" fill="#f3e9d8" />
		<circle cx="118" cy="76" r="5" fill="#f3e9d8" />
		<circle cx="83" cy="77" r="2.5" fill={fg} />
		<circle cx="119" cy="77" r="2.5" fill={fg} />
		<path d="M 80 102 Q 86 108 100 105 Q 114 108 120 102" stroke={fg} stroke-width="3" fill="#3a2418" />
		<path d="M 90 116 Q 100 122 110 116" stroke={fg} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
		<circle cx="118" cy="76" r="11" stroke={fg} stroke-width="2" fill="none" />
		<path d="M 129 80 L 134 92" stroke={fg} stroke-width="2" />
	</svg>
{:else if kind === 'cat'}
	<svg
		width={size}
		height={size * 1.2}
		viewBox="0 0 200 240"
		xmlns="http://www.w3.org/2000/svg"
		style="display:block"
		aria-hidden="true"
	>
		<path d="M 30 240 Q 40 180 100 180 Q 160 180 170 240 Z" fill="#2e2620" stroke={fg} stroke-width="3" />
		<path d="M 50 60 L 70 95 L 40 95 Z" fill="#2e2620" stroke={fg} stroke-width="3" />
		<path d="M 150 60 L 160 95 L 130 95 Z" fill="#2e2620" stroke={fg} stroke-width="3" />
		<circle cx="100" cy="110" r="58" fill="#2e2620" stroke={fg} stroke-width="3" />
		<path d="M 56 70 L 64 92 L 48 92 Z" fill={accent} opacity="0.7" />
		<path d="M 144 70 L 152 92 L 136 92 Z" fill={accent} opacity="0.7" />
		<path d="M 70 108 Q 82 116 94 108" stroke="#f3e9d8" stroke-width="3" fill="none" />
		<path d="M 106 108 Q 118 116 130 108" stroke="#f3e9d8" stroke-width="3" fill="none" />
		<path d="M 94 124 L 106 124 L 100 132 Z" fill={accent} />
		<path d="M 100 132 L 100 138 M 100 138 Q 92 145 86 142 M 100 138 Q 108 145 114 142" stroke="#f3e9d8" stroke-width="2.5" fill="none" />
		<path d="M 60 130 L 86 132 M 60 138 L 86 138 M 140 130 L 114 132 M 140 138 L 114 138" stroke="#f3e9d8" stroke-width="1.5" />
	</svg>
{:else}
	<svg
		width={size}
		height={size * 1.2}
		viewBox="0 0 200 240"
		xmlns="http://www.w3.org/2000/svg"
		style="display:block"
		aria-hidden="true"
	>
		<circle cx="100" cy="120" r="80" fill={accent} stroke={fg} stroke-width="3" />
	</svg>
{/if}
