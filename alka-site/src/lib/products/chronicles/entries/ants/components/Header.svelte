<script lang="ts">
	import { antsDict } from '$lib/products/chronicles/entries/ants/i18n';
	import { dict } from '$lib/products/alka/i18n';
	import BackToMain from '$lib/components/BackToMain.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

	/**
	 * The sticky bar: the republic's crown, its name, and the way back.
	 *
	 * The artifact shipped its own en/ru/nl pills backed by component state.
	 * The pills LOOK the same - they belong to this entry - but the markup is
	 * now the shared LanguageSwitcher and the look is painted by
	 * `.ants-root .lang-switch` in styles.css. They drive the shared `locale`
	 * store, so the language a visitor picked on the AL.KA menu is already
	 * selected when they get here, and picking Dutch on the beach carries back
	 * to the menu.
	 *
	 * The back link points at `/chronicles`, not the holding menu. This is a
	 * blog entry, and a reader who came from the index wants the index back,
	 * not the top of the site. It draws in `currentColor` and inherits this
	 * bar's Nunito, so it reads as part of the republic rather than as chrome
	 * bolted on top.
	 */
	const t = $derived($antsDict);
</script>

<div
	style="position: sticky; top: 0; z-index: 50; display: flex; justify-content: center; padding: 14px 16px; background: rgba(246,234,210,.82); backdrop-filter: blur(8px); border-bottom: 2px solid rgba(42,33,28,.10);"
>
	<div class="republic-bar" style="display: flex; align-items: center; gap: 18px; width: 100%; max-width: 1120px;">
		<span class="republic-back" style="font-family: Nunito, sans-serif; font-size: 13px; font-weight: 700; color: #5A4A3E;">
			<BackToMain compact href="/chronicles" text={$dict.chronicles.title} label={$dict.chronicles.title} />
		</span>

		<div style="display: flex; align-items: center; gap: 10px; margin-right: auto;">
			<svg viewBox="0 0 40 52" width="26" height="34" aria-hidden="true">
				<path d="M8 46h24l-2-6H10z" fill="#14100F" />
				<path d="M11 40c0-7 4-9 4-13l-3-2 2-4h12l2 4-3 2c0 4 4 6 4 13z" fill="#14100F" />
				<path d="M6 6l4 9 5-8 5 8 5-8 4 8 4-9 1 15H5z" fill="#14100F" />
				<circle cx="6" cy="5" r="3" fill="#E39B3D" />
				<circle cx="20" cy="4" r="3" fill="#E39B3D" />
				<circle cx="34" cy="5" r="3" fill="#E39B3D" />
			</svg>
			<span
				class="republic-name"
				style="font-family: Comfortaa, cursive; font-weight: 700; font-size: clamp(11px, 2.2vw, 15px); line-height: 1.25; letter-spacing: .01em; max-width: 30ch;"
				>{t.brand}</span
			>
		</div>

		<LanguageSwitcher variant="group" />
	</div>
</div>
