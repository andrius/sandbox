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

export interface Labels {
	letter_signed: string;
	since: string;
	page: string;
	issue: string;
	volume: string;
	prospectus: string;
	annual_report: string;
	quarterly: string;
	bulletin: string;
	employees: string;
	fiscal: string;
	cover_story: string;
	continued: string;
	kicker_services: string;
	kicker_team: string;
	kicker_numbers: string;
	kicker_press: string;
	kicker_contact: string;
	age_short: string;
	title_short: string;
	established: string;
	head_office: string;
	private_co: string;
	a_letter_excerpt: string;
	keep_dreaming: string;
}

export interface Dict {
	code: string;
	label: string;
	name: string;
	full: string;
	tagline: string;
	estd: string;
	hq: string;

	nav_about: string;
	nav_services: string;
	nav_team: string;
	nav_numbers: string;
	nav_press: string;
	nav_contact: string;

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
	services_label: string;
	services: Service[];

	team_label: string;
	team: TeamMember[];

	numbers_label: string;
	numbers: NumberStat[];

	press_label: string;
	press: PressQuote[];

	contact_label: string;
	contact: Contact;

	labels: Labels;
	disclaimer: string;

	/* Page-level meta for <title> + description */
	meta_title: string;
	meta_description: string;
}
