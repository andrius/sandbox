import type { Dict } from './types';

export const es: Dict = {
	code: 'ES',
	label: 'Español',

	name: 'AL.KA',
	tagline: 'Soluciones de siesta verticalmente integradas',
	estd: '2016',
	hq: 'Litera de arriba, dormitorio dos',

	hero_kicker: 'CARTA DEL FUNDADOR',
	hero_letter:
		'Cuando tenía nueve años me di cuenta de una cosa. Todos los adultos a mi alrededor estaban permanentemente cansados - y ninguno sabía echarse una siesta en condiciones. Decidí arreglarlo.\n\nHoy AL.KA atiende a un hogar de cuatro personas (más un gato) repartido entre dos dormitorios, un sofá y un puf estratégicamente colocado. Nuestras siestas son más profundas, nuestras meriendas más calientes y los lunes, francamente, son opcionales.\n\nNo hemos hecho más que empezar.',

	section_mission: 'Nuestra misión',
	section_services: 'Qué hacemos',
	section_team: 'Dirección',
	section_numbers: 'AL.KA en cifras',
	section_press: 'Lo que dice la prensa',
	section_contact: 'Ponte en contacto',
	section_disclaimer: 'Aviso legal',

	mission_lead:
		'AL.KA es el único proveedor del mundo totalmente integrado en vertical de servicios premium de siesta. Desde la elección de la almohada hasta la merienda posterior, controlamos toda la cadena de suministro del sueño. Descansamos nosotros para que tú no tengas que hacerlo.',

	products: {
		chronicles: {
			name: 'Crónicas del fundador',
			blurb: 'El registro oficial de la compañía. Se lleva a mano y sin ninguna regularidad.'
		},
		sleep: {
			name: 'Soluciones de siesta',
			blurb: 'Servicios de siesta integrados en vertical: preparación, ejecución y reincorporación posterior.'
		},
		pizza: {
			name: 'Fake Pizza Hotline',
			blurb: 'Todo el proceso de pedir pizza. Sin nada de pizza. Línea abierta de madrugada, y muy poco rato.'
		},
		water: {
			name: 'Wet Water',
			blurb: 'La primera agua de Europa con humedad certificada. Y una guía de calor que sí sirve.'
		}
	},

	chronicles: {
		kicker: 'división 01',
		title: 'Crónicas del fundador',
		lead: 'El registro oficial de la compañía. Escrito a mano y publicado aquí cada vez que una página sale legible.',
		body: [
			'Las crónicas se llevan desde 2026 en un cuaderno cuadriculado guardado bajo la almohada de la sede central. La digitalización está prevista para algún momento posterior a que el fundador aprenda a escribir sin mirar el teclado.',
			'El volumen actual incluye: la lista completa de salchichas consumidas, un gráfico de calidad del sueño por día de la semana y una página dedicada por entero al gato.'
		]
	},

	services: [
		{ code: '01', name: 'Preparación de la siesta', blurb: 'Colocación de almohadas, análisis del peso del edredón y un rastreo exhaustivo de migas. Nunca entramos en una siesta sin preparar.' },
		{ code: '02', name: 'Ejecución de la siesta™', blurb: 'Nuestro servicio estrella. Calidad de ronquido líder del sector. Con la boca abierta o cerrada, sin recargo.' },
		{ code: '03', name: 'Reincorporación post-siesta', blurb: 'Un regreso guiado a la sociedad. Incluye un zumo en brik, dos quejas y un aterrizaje suave en el sofá.' },
		{ code: '04', name: 'Asignación estratégica de meriendas', blurb: 'Dulce antes, salchichas después. Hamburguesas reservadas para emergencias. Toda la merienda se enruta por el centro logístico de la cocina.' },
		{ code: '05', name: 'Optimización de sofá y cama', blurb: 'Aplicamos técnicas patentadas de ahuecado para maximizar el retorno por almohada (ROI) en varias superficies de reposo.' },
		{ code: '06', name: 'Logística de almohadas 24/7', blurb: 'Las almohadas se rastrean en tiempo real. Si una desaparece por la noche, está en el suelo. Esa es la garantía.' }
	],

	team: [
		{ name: 'A. K.', title: 'Fundador y director general', age: '10', bio: 'Actualmente en la clase L4C. Ostenta el récord absoluto de siesta diurna más larga (4 h 12 min, imbatido). Fuera del trabajo: natación, bici y videojuegos.', portrait: 'kid' },
		{ name: 'Sir Mijaíl Almohadín', title: 'Director de confort', age: '7', bio: 'Un oso de pocas palabras y considerable relleno. En AL.KA desde el primer día. Especializado en dejarse abrazar sin rechistar.', portrait: 'bear' },
		{ name: 'Madame Edredonova', title: 'Vicepresidenta de ingeniería de almohadas', age: ' - ', bio: 'Procede del armario de la ropa blanca del piso de arriba. Memoria: viscoelástica, fotográfica. Jamás se ha levantado con el pie izquierdo.', portrait: 'pillow' },
		{ name: 'Doctor Salchichón', title: 'Director de meriendas', age: ' - ', bio: 'Llegó a AL.KA desde un platito de desayuno. Doctorado en charcutería por la Universidad del Sábado por la Mañana.', portrait: 'sausage' },
		{ name: 'El General', title: 'Director de recuperación', age: '12', bio: 'Un gato. Duerme dieciséis horas al día. Marca el ejemplo para toda la empresa. No rinde cuentas a nadie.', portrait: 'cat' }
	],

	numbers: [
		{ value: '4.380', label: 'siestas completadas con éxito desde la fundación' },
		{ value: '99,7%', label: 'satisfacción del cliente (autodeclarada, en general)' },
		{ value: '0', label: 'lunes a los que se ha asistido voluntariamente' },
		{ value: '14 h', label: 'capacidad máxima de siesta, un solo operador' },
		{ value: '1', label: 'instalación insignia (litera de arriba, orientación norte)' },
		{ value: '€4,50', label: 'coste total de un pack de merienda premium' }
	],

	press: [
		{ quote: 'Sinceramente, el mejor durmiente que he criado en mi vida. No hay manera de despertarlo para ir al colegio.', source: 'SEMANARIO DE MAMÁ', date: 'abril de 2026' },
		{ quote: 'Esta mañana se negó categóricamente a salir de la cama. Cinco salchichas sobre cinco.', source: 'LA GACETA DE LA ALMOHADA', date: 'marzo de 2026' },
		{ quote: 'El enfoque de AL.KA basado en la salchicha está transformando toda la industria de la fiambrera.', source: 'REVISTA DE LA MERIENDA', date: 'febrero de 2026' },
		{ quote: 'Una categoría de uno. (No hemos encontrado una segunda empresa de siestas dirigida por alguien de diez años.)', source: 'BOLETÍN DE LA LITERA', date: 'enero de 2026' }
	],

	contact: {
		address: 'Litera de arriba, dormitorio dos\nPrimera planta, pasada la colada\n(llamar antes de entrar)',
		hours: 'Abierto 24 / 7\nCerrado durante la merienda\nSábados: fuera, en la bici',
		email: 'ceo@al.ka.fyi',
		email_alt: 'al@ka.fyi',
		phone: 'Deslizar una nota por debajo de la puerta'
	},

	labels: {
		letter_signed: 'A. K., fundador',
		kicker_services: 'cartera de servicios',
		kicker_team: 'alta dirección',
		kicker_numbers: 'resultados operativos',
		kicker_press: 'reseñas de prensa',
		kicker_contact: 'datos de contacto',
		age_short: 'edad',
		established: 'fundada en',
		head_office: 'sede central',
		a_letter_excerpt: 'de la carta del fundador',
		keep_dreaming: 'Buenas noches.',
		hours: 'Horario',
		email: 'Correo',
		note: 'Nota',
		entries: 'Entradas',
		portfolio: 'Cartera',
		soon: 'en desarrollo',
		home: 'AL.KA - volver al inicio'
	},

	numbers_footnote: 'Según estimación de la dirección. Sin auditar. Fuente: un diario.',

	disclaimer:
		'AL.KA HOLDINGS, S.L. es una empresa privada del sector de la siesta. Ninguna siesta es reembolsable. Los resultados de sueño pasados no garantizan resultados futuros. Las previsiones relativas a la hora de acostarse pueden cambiar sin previo aviso, especialmente los viernes. Las imágenes de salchichas son meramente ilustrativas. El director general tiene diez años y en este momento carece de permiso de conducir. Al leer esta página, aceptas echarte una siesta.',

	meta_home_title: 'AL.KA - soluciones de siesta verticalmente integradas',
	meta_home_description:
		'AL.KA es un holding con cuatro divisiones: crónicas del fundador, soluciones de siesta, Fake Pizza Hotline y Wet Water. Sede central: litera de arriba, dormitorio dos.',
	meta_sleep_title: 'Soluciones de siesta - AL.KA',
	meta_sleep_description:
		'La división insignia de AL.KA: preparación de la siesta, ejecución de la siesta™, reincorporación posterior y logística de almohadas 24/7.',
	meta_chronicles_title: 'Crónicas del fundador - AL.KA',
	meta_chronicles_description:
		'El registro oficial de AL.KA. Escrito a mano desde 2026 y publicado aquí cada vez que una página sale legible.'
};
