import type { Meta, StoryObj } from '@storybook/sveltekit';
import Footer from './Footer.svelte';

/** the closing bar and its small print */
const meta = {
	title: 'Pizza/Chrome/Footer',
	component: Footer,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Footer>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
