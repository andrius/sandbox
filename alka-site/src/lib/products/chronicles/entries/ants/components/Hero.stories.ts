import type { Meta, StoryObj } from '@storybook/sveltekit';
import Hero from './Hero.svelte';

/** the title spread: crown, badges and the invitation to scroll */
const meta = {
	title: 'Chronicles/Ants/Hero',
	component: Hero,
	parameters: { product: 'chronicles' }
} satisfies Meta<typeof Hero>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
