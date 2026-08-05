export type MenuId = 'void' | 'margherita' | 'pepperoni' | 'hawaiian' | 'ghost' | 'meatlovers';

export type MenuItem = {
	id: MenuId;
	emoji: string;
	price: number;
	vegan?: boolean;
	gf?: boolean;
	popular?: boolean;
};

export const MENU: MenuItem[] = [
	{ id: 'void', emoji: '🕳️', price: 18.5, popular: true },
	{ id: 'margherita', emoji: '🍅', price: 16, vegan: true },
	{ id: 'pepperoni', emoji: '🍕', price: 19 },
	{ id: 'hawaiian', emoji: '🍍', price: 17.5 },
	{ id: 'ghost', emoji: '👻', price: 21, vegan: true, gf: true },
	{ id: 'meatlovers', emoji: '🥓', price: 23 }
];

export const menuById = (id: string): MenuItem | undefined => MENU.find((m) => m.id === id);
