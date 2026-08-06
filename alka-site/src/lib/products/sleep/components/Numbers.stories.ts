import type { Meta, StoryObj } from '@storybook/sveltekit';
import Numbers from './Numbers.svelte';

/** the counted statistics ledger; the hero stat counts up on entry */
const meta = {
	title: 'Sleep/Numbers',
	component: Numbers,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Numbers>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
