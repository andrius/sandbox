import { browser } from '$app/environment';

export type CartLine = { id: string; qty: number };

const KEY = 'fph_cart';

function load(): CartLine[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((l) => l && typeof l.id === 'string' && typeof l.qty === 'number');
	} catch {
		return [];
	}
}

export const cart = $state<{ lines: CartLine[] }>({ lines: load() });

function persist() {
	if (browser) localStorage.setItem(KEY, JSON.stringify(cart.lines));
}

export function addToCart(id: string) {
	const line = cart.lines.find((l) => l.id === id);
	if (line) line.qty += 1;
	else cart.lines.push({ id, qty: 1 });
	persist();
}

export function setQty(id: string, qty: number) {
	if (qty <= 0) {
		cart.lines = cart.lines.filter((l) => l.id !== id);
	} else {
		const line = cart.lines.find((l) => l.id === id);
		if (line) line.qty = qty;
	}
	persist();
}

export function removeFromCart(id: string) {
	cart.lines = cart.lines.filter((l) => l.id !== id);
	persist();
}

export function clearCart() {
	cart.lines = [];
	persist();
}

export function cartCount(): number {
	return cart.lines.reduce((n, l) => n + l.qty, 0);
}
