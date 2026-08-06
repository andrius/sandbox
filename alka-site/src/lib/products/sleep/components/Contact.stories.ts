import type { Meta, StoryObj } from '@storybook/sveltekit';
import Contact from './Contact.svelte';

/** the four-cell contact ledger */
const meta = {
	title: 'Sleep/Contact',
	component: Contact,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Contact>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
