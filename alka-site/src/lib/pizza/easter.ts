import { browser } from '$app/environment';

const SEQUENCE = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a'
];

function toast(message: string) {
	const el = document.createElement('div');
	el.textContent = message;
	el.setAttribute('role', 'status');
	el.style.cssText =
		'position:fixed;left:50%;top:5.5rem;transform:translateX(-50%);z-index:300;' +
		'padding:0.6rem 1.1rem;border-radius:999px;font:700 0.85rem/1 Manrope,system-ui,sans-serif;' +
		'color:var(--color-void-950);background:var(--color-cheese-300);' +
		'box-shadow:0 14px 34px -12px rgba(0,0,0,.55);pointer-events:none;opacity:0;transition:opacity .25s';
	document.body.appendChild(el);
	requestAnimationFrame(() => (el.style.opacity = '1'));
	setTimeout(() => {
		el.style.opacity = '0';
		setTimeout(() => el.remove(), 300);
	}, 2400);
}

/** The Konami payoff: a brief "fake pizza storm". Reduced-motion gets the toast only. */
export function rainNothing() {
	if (!browser) return;
	toast('🍕 Fake pizza storm. Still 0 calories.');
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const glyphs = ['🍕', '🍕', '📦', '🕳️', '🍕'];
	for (let i = 0; i < 28; i++) {
		const el = document.createElement('div');
		el.textContent = glyphs[(Math.random() * glyphs.length) | 0];
		el.setAttribute('aria-hidden', 'true');
		el.style.cssText =
			`position:fixed;top:-3rem;left:${Math.random() * 100}vw;font-size:${1.1 + Math.random() * 1.9}rem;` +
			'z-index:250;pointer-events:none;will-change:transform,opacity';
		document.body.appendChild(el);
		const drift = (Math.random() * 2 - 1) * 90;
		const spin = (Math.random() * 2 - 1) * 540;
		el.animate(
			[
				{ transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
				{ transform: `translate(${drift}px, 112vh) rotate(${spin}deg)`, opacity: 1, offset: 0.9 },
				{ transform: `translate(${drift}px, 118vh) rotate(${spin}deg)`, opacity: 0 }
			],
			{ duration: 2400 + Math.random() * 1800, delay: Math.random() * 700, easing: 'linear' }
		).finished.then(
			() => el.remove(),
			() => el.remove()
		);
	}
}

/** Listen for the Konami code; returns a cleanup function. */
export function initKonami(onTrigger: () => void): () => void {
	if (!browser) return () => {};
	let idx = 0;
	const onKey = (e: KeyboardEvent) => {
		const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
		idx = key === SEQUENCE[idx] ? idx + 1 : key === SEQUENCE[0] ? 1 : 0;
		if (idx === SEQUENCE.length) {
			idx = 0;
			onTrigger();
		}
	};
	window.addEventListener('keydown', onKey);
	return () => window.removeEventListener('keydown', onKey);
}
