import type { Meta, StoryObj } from '@storybook/sveltekit';
import VoidPizza from './VoidPizza.svelte';

/** the illustration of nothing, on a plate */
const meta = {
	title: 'Pizza/Chrome/VoidPizza',
	component: VoidPizza,
	parameters: { product: 'pizza', layout: 'centered' }
} satisfies Meta<typeof VoidPizza>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
