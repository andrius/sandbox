import type { Meta, StoryObj } from '@storybook/sveltekit';
import Hero from './Hero.svelte';

/** the headline promise and both calls to action */
const meta = {
	title: 'Pizza/Sections/Hero',
	component: Hero,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Hero>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
