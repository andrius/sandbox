import type { Meta, StoryObj } from '@storybook/sveltekit';
import Marquee from './Marquee.svelte';

/** the scrolling claim ticker */
const meta = {
	title: 'Pizza/Sections/Marquee',
	component: Marquee,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Marquee>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
