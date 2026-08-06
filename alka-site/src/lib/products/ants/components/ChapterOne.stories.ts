import type { Meta, StoryObj } from '@storybook/sveltekit';
import ChapterOne from './ChapterOne.svelte';

/** chapter one - the shampoo-bottle palace, capacity one monarch */
const meta = {
	title: 'Ants/ChapterOne',
	component: ChapterOne,
	parameters: { product: 'ants' }
} satisfies Meta<typeof ChapterOne>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
