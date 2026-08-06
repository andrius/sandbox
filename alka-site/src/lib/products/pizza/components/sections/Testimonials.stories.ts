import type { Meta, StoryObj } from '@storybook/sveltekit';
import Testimonials from './Testimonials.svelte';

/** reviews from satisfied non-recipients */
const meta = {
	title: 'Pizza/Sections/Testimonials',
	component: Testimonials,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Testimonials>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
