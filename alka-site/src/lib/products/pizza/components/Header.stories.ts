import type { Meta, StoryObj } from '@storybook/sveltekit';
import Header from './Header.svelte';

/** the fixed bar: back to AL.KA, nav, language, cart */
const meta = {
	title: 'Pizza/Chrome/Header',
	component: Header,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Header>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
