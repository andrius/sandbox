import type { Meta, StoryObj } from '@storybook/sveltekit';
import Guarantee from './Guarantee.svelte';

/** the promise, in the largest available type */
const meta = {
	title: 'Pizza/Sections/Guarantee',
	component: Guarantee,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Guarantee>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
