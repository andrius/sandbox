import type { Meta, StoryObj } from '@storybook/sveltekit';
import Cover from './Cover.svelte';

/** the register strip, wordmark and the founding facts */
const meta = {
	title: 'Sleep/Cover',
	component: Cover,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Cover>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
