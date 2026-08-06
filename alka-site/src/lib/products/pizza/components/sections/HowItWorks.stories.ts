import type { Meta, StoryObj } from '@storybook/sveltekit';
import HowItWorks from './HowItWorks.svelte';

/** the three-step ordering ritual */
const meta = {
	title: 'Pizza/Sections/HowItWorks',
	component: HowItWorks,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof HowItWorks>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
