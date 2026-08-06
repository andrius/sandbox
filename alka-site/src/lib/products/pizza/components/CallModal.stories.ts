import type { Meta, StoryObj } from '@storybook/sveltekit';
import CallModal from './CallModal.svelte';

/** the dialog behind the call button, with its focus trap */
const meta = {
	title: 'Pizza/Chrome/CallModal',
	component: CallModal,
	parameters: { product: 'pizza' }
} satisfies Meta<typeof CallModal>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
