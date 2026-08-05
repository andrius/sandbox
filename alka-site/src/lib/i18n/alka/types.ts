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
	email: string;
	phone: string;
}

/** One division in the portfolio menu on the start page.
 *  `status: 'soon'` marks a division still under construction - the row is
 *  still a link (it has a page saying so) but carries the `soon` tag and is
 *  visually recessive next to the shipping products. */
export interface Product {
	code: string;
	name: string;
	blurb: string;
	href: string;
	status: 'live' | 'soon';
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

	products: Product[];

	/** The Founder chronicles division - shipped as an honest holding page. */
	chronicles: {
		kicker: string;
		title: string;
		lead: string;
		body: string[];
		eta: string;
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
