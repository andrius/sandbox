import type { Meta, StoryObj } from '@storybook/sveltekit';
import LanguageSwitcher from './LanguageSwitcher.svelte';

/**
 * The only language switcher in the app, in each of its three shapes.
 *
 * There used to be five separate components and blocks of markup doing this
 * job, each with its own copy of the language list; Wet Water's was a language
 * behind and would have hidden Spanish. The list, the pressed state and the
 * wiring are shared now. What is NOT shared is the look: each story below is
 * dressed as a different division, and every one of them is painted entirely
 * by that division's own stylesheet.
 *
 * The switcher has no props beyond `variant` and no local state - it reads and
 * writes the one shared `locale` store, so clicking a language here changes
 * every other story in this Storybook, and the toolbar globe follows along.
 */
const meta = {
	title: 'Shared/LanguageSwitcher',
	component: LanguageSwitcher,
	parameters: { product: 'sleep' },
	argTypes: {
		variant: {
			control: 'inline-radio',
			options: ['rule', 'group', 'cards'],
			description: 'Shape only. Colour and type come from the host division.'
		}
	}
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The AL.KA register strip. The one variant styled by the component itself,
 * because it paints nothing: it inherits font, size, tracking and casing from
 * whatever bar it lands in.
 */
export const Rule: Story = { args: { variant: 'rule' } };

/**
 * The start page chooser. Flag plus endonym at reading size, because the
 * visitor who most needs this control is a child who cannot yet read any of
 * the four names. Narrow the viewport past 640px to see it fold to two rows.
 */
export const Cards: Story = { args: { variant: 'cards' } };

/** Wet Water's segmented tabs: one hairline capsule, cyan gradient on the
 *  active tab. */
export const GroupOnWater: Story = {
	args: { variant: 'group' },
	parameters: { product: 'water' }
};

/** The same markup as Pizza wears it: dark capsule, cream chip on the active
 *  pill. Identical structure, unrecognisably different costume - which is the
 *  point of unifying the one and not the other. */
export const GroupOnPizza: Story = {
	args: { variant: 'group' },
	parameters: { product: 'pizza' }
};
