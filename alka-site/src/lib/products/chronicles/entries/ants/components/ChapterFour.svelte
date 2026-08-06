<script lang="ts">
	import { antsDict } from '$lib/products/chronicles/entries/ants/i18n';

	/** chapter four - the alliance, and the three-clause treaty */
	const t = $derived($antsDict);
</script>

<section data-reveal="1" data-screen-label="04" style="max-width: 1120px; margin: 0 auto; padding: 96px 20px 40px;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: clamp(24px, 5vw, 64px); align-items: center;">
    <div style="order: 2; position: relative; padding: 20px; border-radius: 28px; background: #FFF6E2; border: 3px solid rgba(42,33,28,.12); box-shadow: 0 18px 40px -28px rgba(42,33,28,.5);">
      <svg viewBox="0 0 420 400" style="display: block; width: 100%; height: auto;" role="img" aria-label="The queen ant seated in the middle of the bottle palace like a chess queen on d8, beside a dune at sunset">
        <defs>
          <linearGradient id="aSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#F7D9A6" /><stop offset="1" stop-color="#F3E4C2" />
          </linearGradient>
          <linearGradient id="aBottle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#EDF8F4" stop-opacity=".95" /><stop offset="1" stop-color="#B4D8D1" stop-opacity=".7" />
          </linearGradient>
        </defs>
        <circle cx="210" cy="190" r="152" fill="url(#aSky)" />
        <circle cx="86" cy="76" r="30" fill="#F2B44E" opacity=".92" />
        <path d="M20 300q110 12 190-8t210 14v134H20z" fill="#E7CE9E" />
        <path d="M20 320q120-6 196-22t204 20" stroke="#DCBF8B" stroke-width="6" fill="none" />

        <g transform="translate(120 88)">
          <g style="transform-origin: 90px 220px; animation: ants-wobble 6s ease-in-out infinite;">
            <rect x="8" y="46" width="164" height="192" rx="38" fill="url(#aBottle)" stroke="#2A211C" stroke-width="6" />
            <path d="M62 46c0-20 4-28 4-28h48s4 8 4 28z" fill="#DCEEEA" stroke="#2A211C" stroke-width="6" />
            <rect x="56" y="-14" width="68" height="32" rx="12" fill="#E39B3D" stroke="#2A211C" stroke-width="6" />
            <g stroke="#2A211C" stroke-width="3" opacity=".28">
              <path d="M8 118h164M8 158h164M8 198h164M50 46v192M90 46v192M130 46v192" />
            </g>
            <g fill="#2A211C" opacity=".1">
              <rect x="8" y="118" width="42" height="40" /><rect x="90" y="118" width="40" height="40" />
              <rect x="50" y="158" width="40" height="40" /><rect x="130" y="158" width="42" height="40" />
            </g>
            <g transform="translate(52 122)">
              <g stroke="#14100F" stroke-width="5" stroke-linecap="round" fill="none">
                <path d="M30 34l-16 20M42 36l0 24M54 34l16 20" /><path d="M28 28l-20 12M56 28l20 12" />
              </g>
              <path d="M62 12q26 12 26 40 0 28-27 36-27-8-27-36 0-28 28-40z" fill="#14100F" stroke="#0A0807" stroke-width="4" />
              <ellipse cx="34" cy="26" rx="14" ry="12" fill="#1E1A18" stroke="#0A0807" stroke-width="4" />
              <ellipse cx="12" cy="20" rx="17" ry="15" fill="#241F1C" stroke="#0A0807" stroke-width="4" />
              <g stroke="#14100F" stroke-width="4" stroke-linecap="round" fill="none"><path d="M4 6q-4-16 4-24" /><path d="M20 6q8-14 22-18" /></g>
              <g fill="#F6EAD2"><circle cx="6" cy="19" r="3.6" /><circle cx="17" cy="21" r="3.2" /></g>
              <path d="M2 6l4-9 5 6 6-9 6 9 5-6 4 9z" fill="#E39B3D" stroke="#0A0807" stroke-width="3" stroke-linejoin="round" transform="translate(-2 -22)" />
            </g>
            <path d="M26 70c-6 42-6 100 0 142" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".6" />
          </g>
          <ellipse cx="90" cy="244" rx="126" ry="26" fill="#DCBF8B" opacity=".7" />
        </g>
        <g stroke="#4E7C5B" stroke-width="5" stroke-linecap="round" fill="none" style="transform-origin: 372px 330px; animation: ants-sway 5.4s ease-in-out infinite;">
          <path d="M372 330q-14-42 0-66" /><path d="M372 330q16-38 32-52" /><path d="M372 330q-26-30-42-34" />
        </g>
      </svg>
    </div>
    <div style="order: 1;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <span style="display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #E39B3D; color: #2A211C; font-family: Comfortaa, cursive; font-weight: 700; font-size: 17px;">4</span>
        <span style="font-size: 12px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #B07A25;">{t.s4.label}</span>
      </div>
      <h2 style="margin: 0 0 18px; font-family: Comfortaa, cursive; font-weight: 700; font-size: clamp(30px, 4vw, 46px); line-height: 1.1; color: #2A211C;">{t.s4.title}</h2>
      {#each t.s4.body as para}
        <p style="margin: 0 0 16px; font-size: clamp(16px, 1.35vw, 19px); line-height: 1.72; color: #4A3D33; text-wrap: pretty;">{para}</p>
      {/each}
      <p style="margin: 26px 0 0; font-family: Caveat, cursive; font-size: 23px; color: #C6402F;">{t.s4.caption}</p>
    </div>
  </div>

  <div style="margin-top: 64px;">
    <h3 style="margin: 0 0 8px; text-align: center; font-family: Comfortaa, cursive; font-weight: 700; font-size: clamp(22px, 2.6vw, 30px); color: #2E5B45;">{t.treatyTitle}</h3>
    <p style="margin: 0 auto 34px; max-width: 520px; text-align: center; font-size: 15px; line-height: 1.6; color: #6E5E50;">{t.treatyNote}</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
      <div style="padding: 26px 24px; border-radius: 24px; background: #EDF3F0; border: 3px solid rgba(46,91,69,.18);">
        <svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
          <path d="M24 4l17 7v11c0 10-7.5 17-17 22C14.5 39 7 32 7 22V11z" fill="#6E8CA0" stroke="#2A211C" stroke-width="3.5" stroke-linejoin="round" />
          <path d="M15 24l6 6 12-13" fill="none" stroke="#FFF6E2" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <h4 style="margin: 14px 0 8px; font-family: Comfortaa, cursive; font-weight: 700; font-size: 19px; color: #2A211C;">{t.terms.shield.t}</h4>
        <p style="margin: 0; font-size: 15.5px; line-height: 1.62; color: #4A3D33;">{t.terms.shield.d}</p>
      </div>
      <div style="padding: 26px 24px; border-radius: 24px; background: #FDF1DC; border: 3px solid rgba(227,155,61,.28);">
        <svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
          <path d="M24 8c10 0 18 8 18 14H6c0-6 8-14 18-14z" fill="#E39B3D" stroke="#2A211C" stroke-width="3.5" stroke-linejoin="round" />
          <path d="M6 22q6-6 12 0t12 0 12 0" fill="none" stroke="#2A211C" stroke-width="3" stroke-linecap="round" />
          <path d="M24 22v20" stroke="#2A211C" stroke-width="3.5" stroke-linecap="round" />
          <path d="M14 42q10-5 20 0" fill="none" stroke="#DCBF8B" stroke-width="4" stroke-linecap="round" />
        </svg>
        <h4 style="margin: 14px 0 8px; font-family: Comfortaa, cursive; font-weight: 700; font-size: 19px; color: #2A211C;">{t.terms.beach.t}</h4>
        <p style="margin: 0; font-size: 15.5px; line-height: 1.62; color: #4A3D33;">{t.terms.beach.d}</p>
      </div>
      <div style="padding: 26px 24px; border-radius: 24px; background: #F7EEE3; border: 3px solid rgba(42,33,28,.14);">
        <svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
          <circle cx="22" cy="24" r="16" fill="#DFB275" stroke="#2A211C" stroke-width="3.5" />
          <g fill="#6B4A2E"><circle cx="17" cy="18" r="2.6" /><circle cx="27" cy="21" r="2.2" /><circle cx="20" cy="29" r="2.4" /><circle cx="29" cy="30" r="2" /></g>
          <g fill="#DFB275" stroke="#2A211C" stroke-width="2.5"><circle cx="41" cy="36" r="4" /><circle cx="36" cy="43" r="3" /></g>
        </svg>
        <h4 style="margin: 14px 0 8px; font-family: Comfortaa, cursive; font-weight: 700; font-size: 19px; color: #2A211C;">{t.terms.cookie.t}</h4>
        <p style="margin: 0; font-size: 15.5px; line-height: 1.62; color: #4A3D33;">{t.terms.cookie.d}</p>
      </div>
    </div>
  </div>
</section>
