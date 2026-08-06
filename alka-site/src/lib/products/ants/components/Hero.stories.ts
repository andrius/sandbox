import type { Meta, StoryObj } from '@storybook/sveltekit';
import Hero from './Hero.svelte';

/** the title spread: crown, badges and the invitation to scroll */
const meta = {
	title: 'Ants/Hero',
	component: Hero,
	parameters: { product: 'ants' }
} satisfies Meta<typeof Hero>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
