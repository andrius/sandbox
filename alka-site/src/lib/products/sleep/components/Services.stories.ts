import type { Meta, StoryObj } from '@storybook/sveltekit';
import Services from './Services.svelte';

/** the coded service list */
const meta = {
	title: 'Sleep/Services',
	component: Services,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Services>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
