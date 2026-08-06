import type { Meta, StoryObj } from '@storybook/sveltekit';
import Header from './Header.svelte';

/**
 * The AL.KA house register strip, in both of its states.
 *
 * `Menu` is the start page: nowhere to go back to, so it prints who this is
 * instead of a back link. `Division` is what `/chronicles` and `/sleep` wear -
 * the way back plus the ordinal, which the component reads from the registry
 * rather than taking as a string, so the two can never disagree.
 *
 * Narrow the viewport past 640px to watch the ordinal drop out: at that width
 * the back link and the language switcher both still do work and it does not.
 */
const meta = {
	title: 'AL.KA/Header',
	component: Header,
	parameters: { product: 'sleep' },
	argTypes: {
		id: {
			control: 'select',
			options: [undefined, 'chronicles', 'sleep', 'pizza', 'water'],
			description: 'Division whose ordinal to print. Omit for the menu itself.'
		},
		spaced: { control: 'boolean' }
	}
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = { args: {} };

export const Division: Story = { args: { id: 'sleep' } };

/** The Sleep cover wants 56px of air under the strip; nothing else does. */
export const DivisionSpaced: Story = { args: { id: 'chronicles', spaced: true } };
