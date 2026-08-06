import type { Meta, StoryObj } from '@storybook/sveltekit';
import Hours from './Hours.svelte';

/** opening hours, computed live from the clock */
const meta = {
	title: 'Pizza/Sections/Hours',
	component: Hours,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Hours>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
