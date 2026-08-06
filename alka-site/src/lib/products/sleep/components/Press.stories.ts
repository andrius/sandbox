import type { Meta, StoryObj } from '@storybook/sveltekit';
import Press from './Press.svelte';

/** pull quotes attributed to entirely fictional outlets */
const meta = {
	title: 'Sleep/Press',
	component: Press,
	parameters: { product: 'sleep' }
} satisfies Meta<typeof Press>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
