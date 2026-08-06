import type { Meta, StoryObj } from '@storybook/sveltekit';
import Disclaimer from './Disclaimer.svelte';

/** the fine print, narrowed to a single readable column */
const meta = {
	title: 'Sleep/Disclaimer',
	component: Disclaimer,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Disclaimer>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
