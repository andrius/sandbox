<script lang="ts">
	import { antsDict } from '$lib/products/chronicles/entries/ants/i18n';

	/** chapter one - the shampoo-bottle palace */
	const t = $derived($antsDict);
</script>

<section data-reveal="1" data-screen-label="01" style="max-width: 1120px; margin: 0 auto; padding: 96px 20px 0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: clamp(24px, 5vw, 64px); align-items: center;">
    <div>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <span style="display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #2E5B45; color: #F6EAD2; font-family: Comfortaa, cursive; font-weight: 700; font-size: 17px;">1</span>
        <span style="font-size: 12px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #6E8CA0;">{t.s1.label}</span>
      </div>
      <h2 style="margin: 0 0 18px; font-family: Comfortaa, cursive; font-weight: 700; font-size: clamp(30px, 4vw, 46px); line-height: 1.1; color: #2A211C;">{t.s1.title}</h2>
      {#each t.s1.body as para}
        <p style="margin: 0 0 16px; font-size: clamp(16px, 1.35vw, 19px); line-height: 1.72; color: #4A3D33; text-wrap: pretty;">{para}</p>
      {/each}
      <p style="margin: 26px 0 0; font-family: Caveat, cursive; font-size: 23px; color: #C6402F;">{t.s1.caption}</p>
    </div>
    <div style="position: relative; padding: 20px; border-radius: 28px; background: #FFF6E2; border: 3px solid rgba(42,33,28,.12); box-shadow: 0 18px 40px -28px rgba(42,33,28,.5);">
      <svg viewBox="0 0 420 400" style="display: block; width: 100%; height: auto;" role="img" aria-label={t.art.palace}>
        <defs>
          <linearGradient id="pBottle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#EDF8F4" stop-opacity=".95" /><stop offset="1" stop-color="#B4D8D1" stop-opacity=".72" />
          </linearGradient>
        </defs>
        <circle cx="210" cy="180" r="150" fill="#F3E4C2" />
        <ellipse cx="210" cy="336" rx="176" ry="42" fill="#E7CE9E" />
        <ellipse cx="210" cy="330" rx="130" ry="28" fill="#EFDCB4" />
        <g style="transform-origin: 210px 328px; animation: ants-wobble 4.4s ease-in-out infinite;">
          <rect x="128" y="112" width="164" height="216" rx="40" fill="url(#pBottle)" stroke="#2A211C" stroke-width="6" />
          <path d="M182 112c0-22 4-30 4-30h48s4 8 4 30z" fill="#DCEEEA" stroke="#2A211C" stroke-width="6" />
          <rect x="176" y="46" width="68" height="34" rx="12" fill="#E39B3D" stroke="#2A211C" stroke-width="6" />
          <path d="M186 46q24-10 48 0" stroke="#2A211C" stroke-width="4" fill="none" stroke-linecap="round" />
          <path d="M150 142c-8 46-8 110 0 156" stroke="#fff" stroke-width="11" stroke-linecap="round" fill="none" opacity=".8" />
          <rect x="146" y="172" width="128" height="106" rx="14" fill="#FFF9EA" stroke="#2A211C" stroke-width="5" />
          <path d="M168 240l10-38 15 20 17-30 17 30 15-20 10 38z" fill="#F2B44E" stroke="#2A211C" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" />
          <g fill="#2A211C"><circle cx="168" cy="198" r="4" /><circle cx="210" cy="193" r="4" /><circle cx="252" cy="198" r="4" /></g>
          <path d="M164 258h92" stroke="#B7A78F" stroke-width="5" stroke-linecap="round" />
          <path d="M180 296q30-10 60 0" stroke="#7FB0A6" stroke-width="6" stroke-linecap="round" fill="none" opacity=".8" />
        </g>
        <g stroke="#4E7C5B" stroke-width="5" stroke-linecap="round" fill="none" style="transform-origin: 350px 330px; animation: ants-sway 5s ease-in-out infinite;">
          <path d="M350 330q-14-40 0-64" /><path d="M350 330q14-38 30-50" /><path d="M350 330q-24-30-40-34" />
        </g>
        <g fill="#DCBF8B"><circle cx="92" cy="342" r="5" /><circle cx="120" cy="356" r="4" /><circle cx="322" cy="350" r="5" /><circle cx="286" cy="360" r="3.5" /></g>
      </svg>
    </div>
  </div>
</section>
