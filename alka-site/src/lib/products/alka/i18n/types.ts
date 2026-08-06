import type { ProductId } from '$lib/products/registry';

export type PortraitKind = 'kid' | 'bear' | 'pillow' | 'sausage' | 'cat';

export interface Service {
	code: string;
	name: string;
	blurb: string;
}

export interface TeamMember {
	name: string;
	title: string;
	age: string;
	bio: string;
	portrait: PortraitKind;
}

export interface NumberStat {
	value: string;
	label: string;
}

export interface PressQuote {
	quote: string;
	source: string;
	date: string;
}

export interface Contact {
	address: string;
	hours: string;
	/** The division's own address - the one the Sleep contact ledger prints. */
	email: string;
	/** The short holding address. Listed beside it on the start page. */
	email_alt: string;
	phone: string;
}

/** The translatable half of a portfolio entry. Everything structural - the
 *  ordinal, the route, whether the division ships yet - lives once in
 *  `$lib/products/registry`, so a new division does not mean editing the same
 *  href into three locale files. */
export interface ProductCopy {
	name: string;
	blurb: string;
}

export interface Labels {
	letter_signed: string;
	kicker_services: string;
	kicker_team: string;
	kicker_numbers: string;
	kicker_press: string;
	kicker_contact: string;
	age_short: string;
	established: string;
	head_office: string;
	a_letter_excerpt: string;
	keep_dreaming: string;
	/** Contact ledger cell headers. */
	hours: string;
	email: string;
	note: string;
	/** Heading over the chronicles entry list. */
	entries: string;
	/** Start-page portfolio menu. */
	portfolio: string;
	soon: string;
	/** Accessible name for the wordmark link back to the start page. */
	home: string;
}

export interface Dict {
	code: string;
	label: string;

	name: string;
	tagline: string;
	estd: string;
	hq: string;

	hero_kicker: string;
	hero_letter: string;

	section_mission: string;
	section_services: string;
	section_team: string;
	section_numbers: string;
	section_press: string;
	section_contact: string;
	section_disclaimer: string;

	mission_lead: string;
	services: Service[];
	team: TeamMember[];
	numbers: NumberStat[];
	press: PressQuote[];
	contact: Contact;

	products: Record<ProductId, ProductCopy>;

	/** The Founder chronicles division - the blog, and its standing intro. */
	chronicles: {
		kicker: string;
		title: string;
		lead: string;
		body: string[];
	};

	labels: Labels;
	disclaimer: string;

	/** Footnote printed under the hero stat in mono uppercase. */
	numbers_footnote: string;

	/* Per-route <title> + description. */
	meta_home_title: string;
	meta_home_description: string;
	meta_sleep_title: string;
	meta_sleep_description: string;
	meta_chronicles_title: string;
	meta_chronicles_description: string;
}
