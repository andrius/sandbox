import type { Meta, StoryObj } from '@storybook/sveltekit';
import Wordmark from './Wordmark.svelte';

/**
 * AL.Ka itself: geometric sans for `AL`, Fraunces italic for the `Ka`.
 *
 * The pairing is the identity, and it is the one thing `BackToMain` keeps
 * when it borrows another product's typography.
 */
const meta = {
	title: 'AL.KA/Wordmark',
	component: Wordmark,
	parameters: { product: 'sleep', layout: 'centered' }
} satisfies Meta<typeof Wordmark>;

export default meta;
type Story = StoryObj<typeof meta>;

/** How it enters on the start page: letters staggered in on load. */
export const Animated: Story = { args: { animated: true } };

/** The still form, for anywhere the entrance would be noise. */
export const Static: Story = { args: { animated: false } };
