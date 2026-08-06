import type { Meta, StoryObj } from '@storybook/sveltekit';
import Letter from './Letter.svelte';

/** the founder letter, set as a two-column editorial spread */
const meta = {
	title: 'Sleep/Letter',
	component: Letter,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Letter>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
