import type { Meta, StoryObj } from '@storybook/sveltekit';
import ChapterThree from './ChapterThree.svelte';

/** chapter three - the Queen, found wingless by the sea */
const meta = {
	title: 'Ants/ChapterThree',
	component: ChapterThree,
	parameters: { product: 'ants' }
} satisfies Meta<typeof ChapterThree>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
