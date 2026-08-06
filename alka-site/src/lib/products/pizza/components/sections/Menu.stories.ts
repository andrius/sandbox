import type { Meta, StoryObj } from '@storybook/sveltekit';
import Menu from './Menu.svelte';

/** the orderable nothing, wired to the cart */
const meta = {
	title: 'Pizza/Sections/Menu',
	component: Menu,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Menu>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
