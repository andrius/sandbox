<script module lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	let { size = 320, class: klass = '' }: { size?: number; class?: string } = $props();
	const gid = `vp-cheese-${counter++}`;
</script>

<svg viewBox="0 0 300 300" width={size} height={size} aria-hidden="true" class={klass}>
	<defs>
		<radialGradient id={gid} cx="40%" cy="32%" r="80%">
			<stop offset="0%" stop-color="#ffe187" />
			<stop offset="55%" stop-color="#ffbe1f" />
			<stop offset="100%" stop-color="#ff8a3d" />
		</radialGradient>
	</defs>
	<circle cx="150" cy="150" r="140" fill="#ad1c0c" />
	<circle cx="150" cy="150" r="122" fill="url(#{gid})" />
	<g fill="#ee3b25">
		<circle cx="96" cy="80" r="15" />
		<circle cx="214" cy="92" r="15" />
		<circle cx="226" cy="190" r="15" />
		<circle cx="86" cy="206" r="15" />
		<circle cx="150" cy="58" r="11" />
	</g>
	<g fill="#36a14a">
		<ellipse cx="120" cy="120" rx="9" ry="5" transform="rotate(30 120 120)" />
		<ellipse cx="196" cy="150" rx="9" ry="5" transform="rotate(-20 196 150)" />
		<ellipse cx="118" cy="180" rx="9" ry="5" transform="rotate(50 118 180)" />
	</g>
	<circle cx="150" cy="152" r="48" fill="#0c0705" />
	<circle cx="150" cy="152" r="48" fill="none" stroke="#44322a" stroke-width="2.5" />
</svg>
