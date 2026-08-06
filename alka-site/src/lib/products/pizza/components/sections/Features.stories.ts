import type { Meta, StoryObj } from '@storybook/sveltekit';
import Features from './Features.svelte';

/** what the hotline does instead of delivering food */
const meta = {
	title: 'Pizza/Sections/Features',
	component: Features,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Features>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
