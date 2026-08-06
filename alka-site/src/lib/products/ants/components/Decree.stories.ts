import type { Meta, StoryObj } from '@storybook/sveltekit';
import Decree from './Decree.svelte';

/** Presidential Decree No. 1, both signatures and the closing note */
const meta = {
	title: 'Ants/Decree',
	component: Decree,
	parameters: { product: 'ants' }
} satisfies Meta<typeof Decree>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
