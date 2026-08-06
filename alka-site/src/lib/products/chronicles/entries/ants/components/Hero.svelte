<script lang="ts">
	import { antsDict } from '$lib/products/chronicles/entries/ants/i18n';

	/** the title spread: crown, badges and the scroll invitation */
	const t = $derived($antsDict);
</script>

<section style="position: relative; padding: 64px 20px 0; background: linear-gradient(#F6EAD2 0%, #F1E0C0 62%, #EAD4AC 100%);">
  <div style="max-width: 1120px; margin: 0 auto; text-align: center; position: relative; z-index: 2;">
    <p style="margin: 0 0 14px; font-size: 13px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #6E8CA0;">{t.kicker}</p>
    <h1 style="margin: 0; font-family: Comfortaa, cursive; font-weight: 700; font-size: clamp(38px, 7vw, 88px); line-height: 1.02; color: #2E5B45; text-wrap: balance;">{t.title}</h1>
    <p style="margin: 20px auto 0; max-width: 620px; font-size: clamp(16px, 1.5vw, 20px); line-height: 1.6; color: #5A4A3E; text-wrap: pretty;">{t.subtitle}</p>
    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 22px; flex-wrap: wrap;">
      <span style="display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 999px; background: #fff8e9; border: 2px solid rgba(42,33,28,.12); font-size: 13px; font-weight: 700; color: #5A4A3E;">
        <svg viewBox="0 0 24 30" width="14" height="18" aria-hidden="true"><path d="M5 27h14l-1-4H6z" fill="#14100F" /><path d="M7 23c0-4 2.5-5.5 2.5-8L8 14l1-2.5h6l1 2.5-1.5 1c0 2.5 2.5 4 2.5 8z" fill="#14100F" /><path d="M3 3l2.5 5.5L9 3.5 12 8.5 15 3.5l3 5L20.5 3 21.5 12H2.5z" fill="#14100F" /></svg>
        {t.badgeQueen}
      </span>
      <span style="display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 999px; background: #fff8e9; border: 2px solid rgba(42,33,28,.12); font-size: 13px; font-weight: 700; color: #5A4A3E;">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 2l9 4v6c0 5-4 8.5-9 10-5-1.5-9-5-9-10V6z" fill="#6E8CA0" stroke="#2A211C" stroke-width="2" stroke-linejoin="round" /></svg>
        {t.badgeTreaty}
      </span>
    </div>
  </div>

  <div style="position: relative; max-width: 1240px; margin: 26px auto 0;">
    <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice" style="display: block; width: 100%; height: auto; min-height: clamp(300px, 44vw, 520px);" role="img" aria-label={t.art.hero}>
      <defs>
        <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#DCEAF0" /><stop offset="1" stop-color="#F7EBD6" />
        </linearGradient>
        <linearGradient id="hSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7C9BAC" /><stop offset="1" stop-color="#9FB9C4" />
        </linearGradient>
        <linearGradient id="hSand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#EFDCB4" /><stop offset="1" stop-color="#E3C793" />
        </linearGradient>
        <linearGradient id="hBottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#EAF6F2" stop-opacity=".92" /><stop offset="1" stop-color="#BDDDD6" stop-opacity=".7" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1200" height="520" fill="url(#hSky)" />

      <g style="transform-origin: 1035px 96px; animation: ants-spinSlow 90s linear infinite;">
        <g stroke="#E39B3D" stroke-width="7" stroke-linecap="round">
          <path d="M1035 20v-16M1035 188v16M951 96h-16M1119 96h16M976 37L965 26M1094 155l11 11M976 155l-11 11M1094 37l11-11" />
        </g>
      </g>
      <circle cx="1035" cy="96" r="46" fill="#F2B44E" stroke="#2A211C" stroke-width="4" />

      <g fill="#fff" opacity=".8">
        <ellipse cx="250" cy="80" rx="66" ry="26" /><ellipse cx="300" cy="72" rx="44" ry="20" />
        <ellipse cx="760" cy="52" rx="52" ry="20" /><ellipse cx="800" cy="60" rx="38" ry="16" />
      </g>

      <rect x="0" y="196" width="1200" height="120" fill="url(#hSea)" />
      <g stroke="#EFF6F7" stroke-width="6" stroke-linecap="round" fill="none" opacity=".9" style="animation: ants-drift 9s linear infinite;">
        <path d="M-140 232q30-16 60 0t60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0" />
        <path d="M-160 268q30-16 60 0t60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0" opacity=".7" />
      </g>
      <g stroke="#F7FAFB" stroke-width="7" stroke-linecap="round" fill="none" style="animation: ants-drift 6s linear infinite;">
        <path d="M-120 302q34-18 68 0t68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0 68 0" />
      </g>

      <path d="M0 306h1200v214H0z" fill="url(#hSand)" />
      <path d="M0 306q160 26 320 6t300 18 300-24 280 12v-18H0z" fill="#F3E4C2" />

      <g>
        <path d="M60 300c40-6 84-2 118 10 26 9 42 24 42 24H0s16-26 60-34z" fill="#E7CE9E" />
        <g stroke="#4E7C5B" stroke-width="5" stroke-linecap="round" fill="none">
          <g style="transform-origin: 78px 300px; animation: ants-sway 4.6s ease-in-out infinite;"><path d="M78 300q-16-38-4-62" /><path d="M78 300q8-40 26-56" /><path d="M78 300q-2-44-22-52" /></g>
          <g style="transform-origin: 150px 306px; animation: ants-sway 5.8s ease-in-out infinite;"><path d="M150 306q-18-34-6-58" /><path d="M150 306q10-36 28-48" /></g>
        </g>
      </g>

      <g>
        <g transform="translate(946 116)">
          <path d="M0 190L0 96" stroke="#6B4A2E" stroke-width="14" stroke-linecap="round" />
          <path d="M0 8l-52 78h104zM0 54l-62 84h124zM0 104l-70 92h140z" fill="#2E5B45" stroke="#25493A" stroke-width="4" stroke-linejoin="round" />
        </g>
        <g transform="translate(1082 148)">
          <path d="M0 158L0 74" stroke="#6B4A2E" stroke-width="11" stroke-linecap="round" />
          <path d="M0 4l-40 60h80zM0 42l-48 64h96zM0 84l-56 72h112z" fill="#37694F" stroke="#25493A" stroke-width="4" stroke-linejoin="round" />
        </g>
        <g transform="translate(862 168)">
          <path d="M0 138L0 66" stroke="#6B4A2E" stroke-width="9" stroke-linecap="round" />
          <path d="M0 4l-34 52h68zM0 38l-42 56h84zM0 74l-48 62h96z" fill="#3F7355" stroke="#25493A" stroke-width="4" stroke-linejoin="round" />
        </g>
      </g>

      <g transform="translate(486 214)">
        <ellipse cx="86" cy="252" rx="150" ry="34" fill="#DCBF8B" />
        <ellipse cx="86" cy="248" rx="112" ry="24" fill="#E9D3A6" />
        <g style="transform-origin: 86px 246px; animation: ants-wobble 5.2s ease-in-out infinite;">
          <rect x="18" y="60" width="136" height="188" rx="34" fill="url(#hBottle)" stroke="#2A211C" stroke-width="5" />
          <path d="M62 60c0-18 4-26 4-26h40s4 8 4 26z" fill="#DCEEEA" stroke="#2A211C" stroke-width="5" />
          <rect x="56" y="10" width="60" height="28" rx="10" fill="#E39B3D" stroke="#2A211C" stroke-width="5" />
          <path d="M36 86c-6 40-6 96 0 138" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".75" fill="none" />
          <rect x="34" y="112" width="104" height="86" rx="12" fill="#FFF6E2" stroke="#2A211C" stroke-width="4" />
          <path d="M52 168l8-30 12 16 14-24 14 24 12-16 8 30z" fill="none" stroke="#2A211C" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />
          <g fill="#2A211C"><circle cx="52" cy="134" r="3" /><circle cx="86" cy="130" r="3" /><circle cx="120" cy="134" r="3" /></g>
          <path d="M50 186h72" stroke="#B7A78F" stroke-width="4" stroke-linecap="round" />
          <path d="M64 214q22-8 44 0" stroke="#7FB0A6" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8" />
        </g>
      </g>

      <g class="marching-ant">
        <g transform="translate(60 462) scale(-.8 .8)">
          <g style="animation: ants-bob 0.5s ease-in-out infinite;">
            <g stroke="#14100F" stroke-width="4" stroke-linecap="round" fill="none">
              <path d="M28 16l-10 14M36 16l0 16M44 16l10 14" /><path d="M28 4l-8 8M44 4l8 8" />
            </g>
            <ellipse cx="20" cy="6" rx="9" ry="8" fill="#14100F" />
            <ellipse cx="37" cy="8" rx="8" ry="7" fill="#14100F" />
            <ellipse cx="56" cy="8" rx="14" ry="10" fill="#14100F" />
            <circle cx="17" cy="4" r="1.8" fill="#F6EAD2" />
          </g>
        </g>
      </g>
    </svg>
    <div style="display: flex; justify-content: center; padding: 14px 0 20px;">
      <span style="font-family: Caveat, cursive; font-size: 22px; color: #5A4A3E; opacity: .8; text-align: center;">{t.scrollHint}</span>
    </div>
  </div>
</section>
