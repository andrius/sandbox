<script lang="ts">
	import { antsDict } from '$lib/products/ants/i18n';

	/** chapter two - the forest ants, deported with honours */
	const t = $derived($antsDict);
</script>

<section data-reveal="1" data-screen-label="02" style="max-width: 1120px; margin: 0 auto; padding: 96px 20px 0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: clamp(24px, 5vw, 64px); align-items: center;">
    <div style="position: relative; padding: 20px; border-radius: 28px; background: #FFF1E4; border: 3px solid rgba(198,64,47,.22); box-shadow: 0 18px 40px -28px rgba(42,33,28,.5); order: 2;">
      <div style="position: relative; container-type: inline-size;">
      <div style="position: absolute; left: 58.6%; top: 14.5%; width: 37.6%; height: 12%; display: grid; place-items: center; font-family: Comfortaa, cursive; font-weight: 700; font-size: 3.5cqw; letter-spacing: .01em; color: #C6402F; white-space: nowrap;">{t.modelName}</div>
      <svg viewBox="0 0 420 400" style="display: block; width: 100%; height: auto;" role="img" aria-label="Two big red forest ants with angry eyebrows in tactical stances">
        <circle cx="210" cy="188" r="152" fill="#FBE0D3" />
        <g stroke="#5F3E2E" stroke-width="6" stroke-linecap="round" fill="none" opacity=".5">
          <path d="M30 330q60-14 120 0M270 336q60-12 120 2" />
        </g>
        <g transform="translate(48 118) rotate(-6)">
          <g stroke="#8E2A1E" stroke-width="7" stroke-linecap="round" fill="none">
            <path d="M96 116l-24 44M114 118l-6 52M132 116l26 42" />
            <path d="M96 112l-40 26M132 112l40 26" />
          </g>
          <ellipse cx="164" cy="104" rx="42" ry="32" fill="#C6402F" stroke="#2A211C" stroke-width="6" />
          <path d="M136 84q26-14 52 0" stroke="#8E2A1E" stroke-width="5" fill="none" stroke-linecap="round" />
          <ellipse cx="112" cy="102" rx="24" ry="22" fill="#B93B2B" stroke="#2A211C" stroke-width="6" />
          <ellipse cx="72" cy="94" rx="30" ry="27" fill="#D2523C" stroke="#2A211C" stroke-width="6" />
          <g stroke="#2A211C" stroke-width="6" stroke-linecap="round" fill="none">
            <path d="M56 70q-14-20-34-22M84 70q10-22 32-26" />
          </g>
          <g fill="#FFF6E2" stroke="#2A211C" stroke-width="3"><circle cx="62" cy="92" r="7" /><circle cx="86" cy="94" r="6" /></g>
          <g fill="#2A211C"><circle cx="64" cy="94" r="3.4" /><circle cx="87" cy="96" r="3" /></g>
          <g stroke="#2A211C" stroke-width="7" stroke-linecap="round"><path d="M48 74l22 8M100 76l-20 8" /></g>
          <path d="M52 108q18 12 36 2" stroke="#2A211C" stroke-width="5" fill="none" stroke-linecap="round" />
          <g stroke="#2A211C" stroke-width="5" stroke-linecap="round" fill="none"><path d="M46 114l-14 10M92 116l12 12" /></g>
        </g>
        <g transform="translate(232 194) scale(-.86 .86)">
          <g stroke="#8E2A1E" stroke-width="8" stroke-linecap="round" fill="none">
            <path d="M96 116l-26 46M114 118l-4 54M132 116l28 44" />
            <path d="M96 112l-42 28M132 112l42 28" />
          </g>
          <ellipse cx="164" cy="104" rx="44" ry="33" fill="#C6402F" stroke="#2A211C" stroke-width="7" />
          <ellipse cx="112" cy="102" rx="25" ry="23" fill="#B93B2B" stroke="#2A211C" stroke-width="7" />
          <ellipse cx="72" cy="94" rx="31" ry="28" fill="#D2523C" stroke="#2A211C" stroke-width="7" />
          <g stroke="#2A211C" stroke-width="6" stroke-linecap="round" fill="none">
            <path d="M56 70q-10-24-30-28M84 70q14-20 36-22" />
          </g>
          <g fill="#FFF6E2" stroke="#2A211C" stroke-width="3"><circle cx="62" cy="92" r="7" /><circle cx="86" cy="94" r="6" /></g>
          <g fill="#2A211C"><circle cx="63" cy="95" r="3.4" /><circle cx="86" cy="97" r="3" /></g>
          <g stroke="#2A211C" stroke-width="7" stroke-linecap="round"><path d="M48 72l24 10M102 74l-22 10" /></g>
          <path d="M52 108q18 14 38 0" stroke="#2A211C" stroke-width="5" fill="none" stroke-linecap="round" />
        </g>
        <g transform="translate(246 58)">
          <rect x="0" y="0" width="158" height="48" rx="14" fill="#FFF6E2" stroke="#2A211C" stroke-width="5" />
          <path d="M30 48l-10 18 28-18z" fill="#FFF6E2" stroke="#2A211C" stroke-width="5" stroke-linejoin="round" />
        </g>
      </svg>
      </div>
    </div>
    <div style="order: 1;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <span style="display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #C6402F; color: #FFF6E2; font-family: Comfortaa, cursive; font-weight: 700; font-size: 17px;">2</span>
        <span style="font-size: 12px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #C6402F;">{t.s2.label}</span>
      </div>
      <h2 style="margin: 0 0 18px; font-family: Comfortaa, cursive; font-weight: 700; font-size: clamp(30px, 4vw, 46px); line-height: 1.1; color: #2A211C;">{t.s2.title}</h2>
      {#each t.s2.body as para}
        <p style="margin: 0 0 16px; font-size: clamp(16px, 1.35vw, 19px); line-height: 1.72; color: #4A3D33; text-wrap: pretty;">{para}</p>
      {/each}
      <p style="margin: 26px 0 0; font-family: Caveat, cursive; font-size: 23px; color: #C6402F;">{t.s2.caption}</p>
    </div>
  </div>
</section>
