<script lang="ts">
	let { size = 38 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 64 64"
	role="img"
	aria-label="Fake Pizza Hotline"
	class="shrink-0"
>
	<circle cx="32" cy="32" r="29" fill="#ad1c0c" />
	<circle cx="32" cy="32" r="25" fill="#ffbe1f" />
	<circle cx="22" cy="20" r="3.4" fill="#ee3b25" />
	<circle cx="44" cy="22" r="3.4" fill="#ee3b25" />
	<circle cx="46" cy="41" r="3.4" fill="#ee3b25" />
	<circle cx="20" cy="42" r="3.4" fill="#ee3b25" />
	<circle cx="32" cy="33" r="10" fill="#0c0705" />
	<circle cx="32" cy="33" r="10" fill="none" stroke="#44322a" stroke-width="1.4" />
</svg>
