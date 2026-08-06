import type { Meta, StoryObj } from '@storybook/sveltekit';
import Chronicles from './Chronicles.svelte';

/**
 * The holding page for division 01, in full.
 *
 * Worth keeping a story on precisely because it is unfinished: this is the
 * page that has to say "not ready yet" without apologising for it, and that
 * tone is easier to judge here than on the live route. Switch the Locale
 * toolbar to check the ETA chip in all three languages - it is the widest
 * piece of mono type on the page and the first thing to wrap.
 */
const meta = {
	title: 'AL.KA/Chronicles',
	component: Chronicles,
	parameters: { product: 'chronicles' }
} satisfies Meta<typeof Chronicles>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
