import type { Meta, StoryObj } from '@storybook/sveltekit';
import FinalCta from './FinalCta.svelte';

/** the last attempt to take an order */
const meta = {
	title: 'Pizza/Sections/FinalCta',
	component: FinalCta,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof FinalCta>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
