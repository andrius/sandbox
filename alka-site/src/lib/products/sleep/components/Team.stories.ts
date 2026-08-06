import type { Meta, StoryObj } from '@storybook/sveltekit';
import Team from './Team.svelte';

/** the staff ledger with hand-drawn portraits */
const meta = {
	title: 'Sleep/Team',
	component: Team,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Team>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
