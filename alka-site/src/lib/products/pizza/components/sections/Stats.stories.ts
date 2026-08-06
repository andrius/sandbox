import type { Meta, StoryObj } from '@storybook/sveltekit';
import Stats from './Stats.svelte';

/** four numbers, none of them about pizza */
const meta = {
	title: 'Pizza/Sections/Stats',
	component: Stats,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Stats>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
