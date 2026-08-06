import type { Meta, StoryObj } from '@storybook/sveltekit';
import Faq from './Faq.svelte';

/** the accordion of reasonable questions */
const meta = {
	title: 'Pizza/Sections/Faq',
	component: Faq,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof Faq>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
