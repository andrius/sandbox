<script lang="ts">
	import { antsDict } from '$lib/products/chronicles/entries/ants/i18n';

	/** Presidential Decree No. 1, both signatures and the closing note */
	const t = $derived($antsDict);
</script>

<footer data-reveal="1" style="position: relative; margin-top: 70px; padding: 70px 20px 90px; background: #FBFBF4; border-top: 3px solid rgba(42,33,28,.14);">
  <svg style="position: absolute; inset: 0; width: 100%; height: 100%;" aria-hidden="true">
    <defs>
      <pattern id="squares" width="26" height="26" patternUnits="userSpaceOnUse">
        <path d="M26 0H0v26" fill="none" stroke="#A9BFD6" stroke-width="1" opacity=".55" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#squares)" />
    <rect x="72" y="0" width="2" height="100%" fill="#E0A0A0" opacity=".7" />
  </svg>
  <div style="position: relative; max-width: 780px; margin: 0 auto;">
    <div style="display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap;">
      <svg viewBox="0 0 120 130" width="88" height="96" aria-hidden="true" style="flex: none; transform-origin: 12px 120px; animation: ants-sway 6.5s ease-in-out infinite;">
        <path d="M12 128V6" stroke="#6B4A2E" stroke-width="7" stroke-linecap="round" />
        <circle cx="12" cy="6" r="6" fill="#E39B3D" stroke="#2A211C" stroke-width="3" />
        <path d="M16 12h92l-16 30 16 30H16z" fill="#F6EAD2" stroke="#2A211C" stroke-width="4" stroke-linejoin="round" />
        <path d="M40 30l5-11 7 8 8-12 8 12 7-8 5 11z" fill="#E39B3D" stroke="#2A211C" stroke-width="3.5" stroke-linejoin="round" />
        <g transform="translate(38 44)">
          <ellipse cx="34" cy="12" rx="13" ry="9" fill="#14100F" />
          <ellipse cx="18" cy="11" rx="7" ry="6" fill="#14100F" />
          <ellipse cx="6" cy="9" rx="8" ry="7" fill="#14100F" />
          <g stroke="#14100F" stroke-width="2.6" stroke-linecap="round" fill="none">
            <path d="M16 18l-5 8M22 19l1 9M28 18l6 8" /><path d="M2 4l-6-5M9 3l3-6" />
          </g>
        </g>
      </svg>
      <div style="flex: 1 1 320px;">
        <p style="margin: 0 0 6px; font-family: Caveat, cursive; font-size: clamp(28px, 4vw, 40px); font-weight: 700; color: #24486E; line-height: 1.1;">{t.decreeTitle}</p>
        <p style="margin: 0 0 18px; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #6E8CA0;">{t.decreeSub}</p>
        {#each t.decree as line}
          <p style="margin: 0 0 12px; font-family: Caveat, cursive; font-size: clamp(21px, 2.4vw, 27px); line-height: 1.45; color: #24486E;">{line}</p>
        {/each}
        <div style="display: flex; gap: 40px; margin-top: 34px; flex-wrap: wrap;">
          <div>
            <div style="width: 168px; height: 2px; background: #24486E; opacity: .5;"></div>
            <p style="margin: 8px 0 0; font-family: Caveat, cursive; font-size: 23px; color: #24486E;">{t.signPresident}</p>
          </div>
          <div>
            <div style="width: 168px; height: 2px; background: #24486E; opacity: .5;"></div>
            <p style="margin: 8px 0 0; font-family: Caveat, cursive; font-size: 23px; color: #24486E;">{t.signQueen}</p>
          </div>
        </div>
      </div>
    </div>
    <p style="margin: 46px 0 0; font-size: 13px; line-height: 1.6; color: #7C8C99;">{t.footNote}</p>
  </div>
</footer>
