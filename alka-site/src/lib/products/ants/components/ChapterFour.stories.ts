import type { Meta, StoryObj } from '@storybook/sveltekit';
import ChapterFour from './ChapterFour.svelte';

/** chapter four - the alliance, and the treaty's three clauses */
const meta = {
	title: 'Ants/ChapterFour',
	component: ChapterFour,
	parameters: { product: 'ants' }
} satisfies Meta<typeof ChapterFour>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
