import type { Meta, StoryObj } from '@storybook/sveltekit';
import ChapterTwo from './ChapterTwo.svelte';

/** chapter two - the forest ants, deported with full honours */
const meta = {
	title: 'Ants/ChapterTwo',
	component: ChapterTwo,
	parameters: { product: 'ants' }
} satisfies Meta<typeof ChapterTwo>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
