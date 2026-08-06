import type { Meta, StoryObj } from '@storybook/sveltekit';
import Header from './Header.svelte';

/** the sticky bar: crown, republic name, language pills and the way back to AL.KA */
const meta = {
	title: 'Chronicles/Ants/Header',
	component: Header,
	parameters: { product: 'chronicles' }
} satisfies Meta<typeof Header>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
