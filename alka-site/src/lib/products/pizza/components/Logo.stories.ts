import type { Meta, StoryObj } from '@storybook/sveltekit';
import Logo from './Logo.svelte';

/** the wordmark glyph */
const meta = {
	title: 'Pizza/Chrome/Logo',
	component: Logo,
	parameters: { product: 'pizza', layout: 'centered' }
} satisfies Meta<typeof Logo>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
