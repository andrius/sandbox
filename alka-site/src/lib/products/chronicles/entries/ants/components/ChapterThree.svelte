<script lang="ts">
	import { antsDict } from '$lib/products/chronicles/entries/ants/i18n';

	/** chapter three - the Queen, found by the sea */
	const t = $derived($antsDict);
</script>

<section data-reveal="1" data-screen-label="03" style="margin-top: 96px; padding: 88px 20px; background: #E7EDEF; border-top: 3px solid rgba(42,33,28,.1); border-bottom: 3px solid rgba(42,33,28,.1);">
  <div style="max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: clamp(24px, 5vw, 64px); align-items: center;">
    <div>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <span style="display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #14100F; color: #F6EAD2; font-family: Comfortaa, cursive; font-weight: 700; font-size: 17px;">3</span>
        <span style="font-size: 12px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #6E8CA0;">{t.s3.label}</span>
      </div>
      <h2 style="margin: 0 0 18px; font-family: Comfortaa, cursive; font-weight: 700; font-size: clamp(30px, 4vw, 46px); line-height: 1.1; color: #14100F;">{t.s3.title}</h2>
      {#each t.s3.body as para}
        <p style="margin: 0 0 16px; font-size: clamp(16px, 1.35vw, 19px); line-height: 1.72; color: #3C4B52; text-wrap: pretty;">{para}</p>
      {/each}
      <div style="display: inline-flex; align-items: center; gap: 14px; margin-top: 24px; padding: 12px 18px; border-radius: 18px; background: #FFF6E2; border: 3px solid rgba(20,16,15,.14);">
        <svg viewBox="0 0 40 52" width="30" height="39" aria-hidden="true">
          <path d="M8 46h24l-2-6H10z" fill="#14100F" />
          <path d="M11 40c0-7 4-9 4-13l-3-2 2-4h12l2 4-3 2c0 4 4 6 4 13z" fill="#14100F" />
          <path d="M6 6l4 9 5-8 5 8 5-8 4 8 4-9 1 15H5z" fill="#14100F" />
          <circle cx="6" cy="5" r="3" fill="#E39B3D" /><circle cx="20" cy="4" r="3" fill="#E39B3D" /><circle cx="34" cy="5" r="3" fill="#E39B3D" />
        </svg>
        <span style="font-family: Caveat, cursive; font-size: 25px; color: #14100F;">{t.s3.caption}</span>
      </div>
    </div>
    <div style="position: relative; padding: 20px; border-radius: 28px; background: #F4F8F9; border: 3px solid rgba(20,16,15,.14); box-shadow: 0 18px 40px -28px rgba(42,33,28,.5);">
      <svg viewBox="0 0 420 400" style="display: block; width: 100%; height: auto;" role="img" aria-label={t.art.queen}>
        <defs>
          <radialGradient id="qGloss" cx=".32" cy=".28" r=".8">
            <stop offset="0" stop-color="#5B5551" /><stop offset=".55" stop-color="#1E1A18" /><stop offset="1" stop-color="#0C0A09" />
          </radialGradient>
          <linearGradient id="qWing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#EAF4F6" stop-opacity=".95" /><stop offset="1" stop-color="#BFD6DE" stop-opacity=".55" />
          </linearGradient>
        </defs>
        <circle cx="210" cy="190" r="152" fill="#DCE7EA" />
        <path d="M20 300q120-40 200-6t180-10v130H20z" fill="#EFDCB4" />
        <path d="M20 316q130-34 196-2t184-14" stroke="#E0C595" stroke-width="6" fill="none" stroke-linecap="round" />

        <g transform="translate(258 250) rotate(18)" opacity=".9">
          <path d="M0 0q64-26 104 6-46 22-104-6z" fill="url(#qWing)" stroke="#8FAEB8" stroke-width="3" />
          <g stroke="#A9C4CC" stroke-width="2" fill="none"><path d="M8 2q40-12 76 4M14 8q36-8 66 4" /></g>
        </g>
        <g transform="translate(276 276) rotate(-8)" opacity=".85">
          <path d="M0 0q56-22 92 4-40 20-92-4z" fill="url(#qWing)" stroke="#8FAEB8" stroke-width="3" />
          <g stroke="#A9C4CC" stroke-width="2" fill="none"><path d="M8 2q34-10 66 4" /></g>
        </g>

        <g transform="translate(58 82)">
          <ellipse cx="150" cy="248" rx="118" ry="18" fill="#CDAF7E" opacity=".5" />
          <g stroke="#14100F" stroke-width="8" stroke-linecap="round" fill="none">
            <path d="M138 152l-42 62M158 158l-4 74M180 152l44 60" />
            <path d="M136 146l-52 34M182 146l52 34" />
          </g>
          <path d="M214 96q54 22 54 84 0 62-56 78-56-16-56-78 0-62 58-84z" fill="url(#qGloss)" stroke="#0A0807" stroke-width="6" />
          <path d="M196 122q-22 34-16 76" stroke="#8D8A88" stroke-width="9" stroke-linecap="round" fill="none" opacity=".55" />
          <ellipse cx="152" cy="122" rx="30" ry="27" fill="#1A1614" stroke="#0A0807" stroke-width="6" />
          <path d="M140 108q14-10 26-2" stroke="#8D8A88" stroke-width="6" stroke-linecap="round" fill="none" opacity=".5" />
          <ellipse cx="102" cy="106" rx="36" ry="33" fill="#221D1A" stroke="#0A0807" stroke-width="6" />
          <path d="M88 88q16-10 30-2" stroke="#8D8A88" stroke-width="7" stroke-linecap="round" fill="none" opacity=".55" />
          <g stroke="#14100F" stroke-width="6" stroke-linecap="round" fill="none">
            <path d="M84 80q-8-32 6-48" /><path d="M116 80q14-26 36-32" />
          </g>
          <g fill="#F6EAD2"><ellipse cx="90" cy="104" rx="7" ry="8" /><ellipse cx="112" cy="106" rx="6" ry="7" /></g>
          <g fill="#0A0807"><circle cx="91" cy="105" r="3.6" /><circle cx="112" cy="107" r="3.2" /></g>
          <path d="M84 122q16 8 30 0" stroke="#0A0807" stroke-width="4" fill="none" stroke-linecap="round" />
          <g transform="translate(74 44)">
            <path d="M0 22l6-16 8 11 9-15 9 15 8-11 6 16z" fill="#E39B3D" stroke="#0A0807" stroke-width="4" stroke-linejoin="round" />
          </g>
          <g fill="#fff" opacity=".85" style="animation: ants-shimmer 3.2s ease-in-out infinite;">
            <circle cx="248" cy="150" r="4" /><circle cx="236" cy="128" r="3" /><circle cx="76" cy="86" r="3" />
          </g>
        </g>
      </svg>
    </div>
  </div>
</section>
