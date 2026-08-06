import type { Dict } from './en';

export const es: Dict = {
	meta: {
		title: 'Fake Pizza Hotline - Todo el pedido. Nada de pizza.',
		description:
			'¿Te encanta pedir pizza pero odias recibirla y comértela? Llama a la Fake Pizza Hotline: una simulación perfecta de la experiencia de pedir pizza. No se preparará ni se te enviará ninguna pizza.'
	},
	brand: {
		short: 'Fake Pizza Hotline',
		tagline: 'Todo el pedido. Nada de pizza.',
		/** The oversized decorative wordmark behind the footer. */
		noPizza: 'SIN PIZZA'
	},
	nav: {
		menu: 'Carta',
		how: 'Cómo funciona',
		guarantee: 'Garantía',
		faq: 'FAQ',
		order: 'Pedir nada'
	},
	lang: {
		label: 'Idioma',
		en: 'EN',
		ru: 'RU',
		nl: 'NL',
		es: 'ES'
	},
	openStatus: {
		openNow: 'Abierto ahora - durante los próximos minutos',
		closed: 'Cerrado',
		opensIn: 'Abre en {{time}}',
		hoursShort: 'De madrugada · 23:58 - 02:35',
		unitH: 'h',
		unitM: 'min'
	},
	hero: {
		badge: 'Fundada un fin de semana de julio · Toronto',
		titleTop: 'FAKE PIZZA',
		titleBottom: 'HOTLINE',
		subtitle:
			'¿Te encanta pedir pizza pero odias recibirla y comértela? Por fin has encontrado a los tuyos.',
		primaryCta: 'Pedir nada ahora',
		secondaryCta: 'Llamar a la línea',
		phoneLabel: 'La línea',
		guaranteeBadge: 'No se preparará ni se te enviará ninguna pizza. Garantizado.',
		boxLabel: 'Tu pedido',
		boxValue: 'Nada'
	},
	marquee: [
		'SIN PIZZA',
		'SIN ENTREGA',
		'SIN ARREPENTIMIENTO',
		'SIN CALORÍAS',
		'SIN DEVOLUCIONES',
		'SIN BORDE',
		'SIN PROBLEMA',
		'SIN BROMA'
	],
	stats: {
		title: 'Los números no mienten. La pizza sí.',
		items: [
			{ value: '0', label: 'pizzas entregadas' },
			{ value: '100%', label: 'tasa de no entrega' },
			{ value: '∞', label: 'no clientes satisfechos' },
			{ value: '2h 37min', label: 'tiempo medio de no entrega' }
		]
	},
	features: {
		kicker: 'Por qué llamarnos',
		title: 'Todo lo que te gusta de pedir. Nada de lo que temes al comer.',
		subtitle: 'Una experiencia completa con exactamente cero gramos de consecuencias.',
		items: [
			{
				icon: '🎷',
				title: 'Música de espera auténtica',
				desc: 'Hasta 45 minutos de jazz metálico, repetido con cariño. Tu llamada no le importa a nadie.'
			},
			{
				icon: '🍕',
				title: 'Nada personalizable',
				desc: 'Monta la pizza de tus sueños ingrediente a ingrediente. Jamás llegará a existir. Sueña con responsabilidad.'
			},
			{
				icon: '🛰️',
				title: 'No seguimiento en tiempo real',
				desc: 'Mira cómo un iconito de pizza se desliza por el mapa hacia un destino al que nunca llegará.'
			},
			{
				icon: '🌱',
				title: 'Vegano y sin gluten',
				desc: 'También falso. Igual de falso, y gloriosamente. Nuestra nada es plenamente inclusiva.'
			}
		]
	},
	how: {
		kicker: 'El proceso',
		title: 'Cómo funciona',
		subtitle: 'Tres pasos sencillos hacia una caja preciosa y vacía.',
		steps: [
			{
				step: '01',
				title: 'Haz tu pedido',
				desc: 'Llama o haz clic. Un operador falso y cordial te guía por la carta con absoluta convicción.'
			},
			{
				step: '02',
				title: 'Personalízalo todo',
				desc: 'Masa, salsa, ingredientes, acompañamientos. Agonía por cada detalle. Ninguno es real.'
			},
			{
				step: '03',
				title: 'No recibas nada',
				desc: 'Tu pedido llega en el momento en que dejas de esperarlo: nunca. Saborea el silencio.'
			}
		]
	},
	menu: {
		kicker: 'La carta',
		title: 'Elaborada a mano por nadie',
		subtitle: 'Horneada en una cocina que no existe. Añade lo que quieras al pedido: no cambia nada.',
		from: 'desde',
		add: 'Añadir al pedido',
		added: 'Añadido',
		badges: { vegan: 'Veganilla', gf: 'Sin-glutenilla', popular: 'La menos favorita' },
		items: {
			void: {
				name: 'El Vacío',
				desc: 'Ausencia estirada a mano sobre un lecho de nada, rematada con un leve susurro de quizá.'
			},
			margherita: {
				name: 'Margarita, Conceptual',
				desc: 'La idea de la albahaca. El recuerdo de la mozzarella. El lejano rumor de un tomate.'
			},
			pepperoni: {
				name: 'Pepperoni Placebo',
				desc: 'Jurarías que lo saboreas. No es así. Nunca estuvo ahí, para empezar.'
			},
			hawaiian: {
				name: 'Hipótesis Hawaiana',
				desc: '¿La piña pega en la pizza? Con nosotros nunca tendrás que averiguarlo.'
			},
			ghost: {
				name: 'El Fantasma Sin Gluten',
				desc: 'Sin gluten. Sin borde. Sin pizza. Sin problema. Sin nada. Bu.'
			},
			meatlovers: {
				name: 'Decepción del Carnívoro',
				desc: 'Todas las carnes que puedas imaginar. Ahora imagina más fuerte. Aun así, no llega nada.'
			}
		}
	},
	a11y: {
		skip: 'Saltar al contenido',
		cart: 'Cesta',
		menu: 'Menú',
		decrease: 'Quitar una',
		increase: 'Añadir una'
	},
	guarantee: {
		/** Three lines of the round dashed seal, stacked. */
		stamp: ['100%', 'SIN', 'PIZZA'],
		kicker: 'La Garantía Fake Pizza Hotline™',
		title: 'No se te preparará, horneará, encajará ni entregará ninguna pizza.',
		body: 'Si llega siquiera una porción a tu puerta, no ha salido de aquí. No tenemos cocina, ni repartidores, ni intención. Esa es nuestra promesa, y pensamos seguir sin romper absolutamente nada.',
		points: [
			'No se preparará ni se te enviará ninguna pizza.',
			'Ningún ingrediente sufrió daño, porque no hay ninguno.',
			'Hay opciones veganas y sin gluten, e igual de falsas.'
		]
	},
	testimonials: {
		kicker: 'Cinco no estrellas',
		title: 'Adorada por gente que odia la pizza',
		items: [
			{
				quote: 'Pedí tres pizzas familiares y mi casa nunca ha estado tan limpia. Cinco estrellas.',
				name: 'Greg',
				city: 'Toronto'
			},
			{
				quote: 'Por fin una pizzería que respeta mi objetivo de no comer pizza.',
				name: 'Dana',
				city: 'Scarborough'
			},
			{
				quote: 'Llevo en espera desde el 15 de julio. La mejor decisión de mi vida.',
				name: 'Anónimo',
				city: 'en algún punto de la espera'
			},
			{
				quote:
					'La pizza nunca llegó. Me avisaron. Tenían razón. Mi fe en los negocios honrados está restaurada.',
				name: 'M.',
				city: 'Etobicoke'
			}
		]
	},
	hours: {
		kicker: 'Horario',
		title: 'Abrimos en una ventana brevísima y muy concreta.',
		fromLabel: 'Desde',
		toLabel: 'Hasta',
		from: 'Sáb 15 de julio · 23:58',
		to: 'Dom 16 de julio · 02:35',
		note: 'Dos horas y treinta y siete minutos de no servicio puro e ininterrumpido. Parpadea y te lo pierdes.',
		reserveNote: 'Para reservar, contacta con alguien que pueda ayudarte. No somos nosotros.'
	},
	faq: {
		kicker: 'Preguntas',
		title: 'Preguntas frecuentemente temidas',
		items: [
			{ q: '¿Voy a recibir pizza de verdad?', a: 'No.' },
			{
				q: 'Pero ¿y si quiero pizza DE VERDAD?',
				a: 'Admiramos tu espíritu. Seguirás sin recibir pizza.'
			},
			{
				q: '¿Las opciones veganas y sin gluten también son falsas?',
				a: 'Sí. Nuestra falsedad es plenamente inclusiva y 100% libre de alérgenos, porque no contiene nada.'
			},
			{
				q: '¿Puedo seguir mi pedido?',
				a: 'Por supuesto. Nuestro rastreador muestra tu pizza avanzando de forma excelente y constante hacia no llegar jamás.'
			},
			{
				q: '¿Esto es un negocio real?',
				a: 'Define «real». Define «negocio». Define «pizza». Esperamos.'
			},
			{
				q: '¿Aceptáis pagos?',
				a: 'Nuestro proceso de pago es una simulación completa. No se mueve dinero real ni se mueve pizza real. Lo llamamos simetría.'
			}
		]
	},
	finalCta: {
		title: '¿Listo para pedir absolutamente nada?',
		subtitle: 'El hambre es real. La pizza no. La experiencia es inolvidable.',
		primary: 'Empezar tu pedido falso',
		secondary: 'Llamar a la línea'
	},
	footer: {
		tagline: 'Una simulación perfecta de la experiencia de pedir pizza.',
		disclaimer:
			'Esto es una parodia. La Fake Pizza Hotline no es un restaurante real, no procesa pagos reales y nunca entregará pizza real. Por favor, no introduzcas datos reales de tarjeta en ninguna parte de este sitio.',
		explore: 'Explorar',
		notLegal: 'Nada legal',
		contact: 'Contacto',
		links: {
			menu: 'Carta',
			how: 'Cómo funciona',
			guarantee: 'Garantía',
			faq: 'FAQ',
			terms: 'Términos de la Nada',
			privacy: 'Privacidad de la Nada',
			refunds: 'Política de devoluciones (ja)',
			careers: 'Empleo (ninguno)'
		},
		rights: '© {{year}} Fake Pizza Hotline. Ningún derecho entregado.',
		madeWith: 'Hecho con hambre y cero pizza.'
	},
	call: {
		title: 'La Fake Pizza Hotline',
		connecting: 'Marcando la Fake Pizza Hotline…',
		hold: 'Estás en espera. Disfruta de 45 minutos de jazz metálico.',
		operator:
			'Operador falso: «Gracias por llamar. Tu pizza no le importa a nadie. ¿Cuánta nada te pongo hoy?»',
		online: 'Mejor pedir nada por internet',
		hangUp: 'Colgar'
	},
	checkout: {
		title: 'Pago',
		simBanner:
			'Solo simulación. No introduzcas datos reales de tarjeta. No se procesará ningún pago ni se enviará ninguna pizza.',
		back: 'Volver a la carta',
		secured: 'Protegido por absolutamente nada',
		empty: {
			title: 'Tu pedido está vacío.',
			subtitle:
				'Que es, sinceramente, nuestra configuración más popular. ¿Te apetece añadir algo de nada de todas formas?',
			cta: 'Ver la carta'
		},
		summary: {
			title: 'Resumen del pedido',
			each: 'c/u',
			remove: 'Quitar',
			subtotal: 'Subtotal',
			tax: 'Impuesto imaginario (13%)',
			delivery: 'Gastos de no entrega',
			deliveryFree: 'Gratis (no hay nada que entregar)',
			discount: 'Descuento por existencia (−100%)',
			total: 'Total cobrado',
			// Matches what `formatMoney` prints for es-ES directly above it.
			free: '0,00 US$',
			simNote: 'Simulación: 0,00 US$ cobrados, 0 pizzas enviadas.'
		},
		form: {
			contactTitle: 'Contacto',
			name: 'Nombre completo',
			namePlaceholder: 'Juana Sinpizza',
			email: 'Correo electrónico',
			emailPlaceholder: 'tu@ejemplo.com',
			phone: 'Teléfono (opcional)',
			phonePlaceholder: '555-NO-PIZZA',
			addressTitle: 'Dirección de entrega',
			addressNote: 'No la vamos a usar. Simplemente disfrutamos de la formalidad.',
			address: 'Calle y número',
			addressPlaceholder: 'Calle de la Caja Vacía, 404',
			city: 'Ciudad',
			cityPlaceholder: 'Toronto',
			zip: 'Código postal',
			zipPlaceholder: 'M0 0M0',
			paymentTitle: 'Pago',
			useTestCard: 'Usar tarjeta de prueba',
			card: 'Número de tarjeta',
			cardPlaceholder: '4242 4242 4242 4242',
			expiry: 'Caducidad',
			expiryPlaceholder: 'MM/AA',
			cvc: 'CVC',
			cvcPlaceholder: '000',
			cardName: 'Titular de la tarjeta',
			cardNamePlaceholder: 'JUANA SINPIZZA',
			agree: 'Entiendo que no voy a recibir ninguna pizza.',
			pay: 'Pagar {{amount}} · Hacer el pedido falso'
		},
		errors: {
			required: 'Obligatorio',
			email: 'Introduce un correo válido',
			card: 'Introduce un número de tarjeta de 16 dígitos',
			expiry: 'MM/AA',
			cvc: '3 dígitos',
			agree: 'Tienes que aceptar tu destino sin pizza.'
		},
		processing: {
			title: 'Procesando tu nada…',
			steps: [
				'Contactando con la cocina que no existe…',
				'Fingiendo amasar la masa…',
				'Sin añadir cuidadosamente ningún ingrediente…',
				'Definitivamente sin precalentar el horno…',
				'Encajando un vacío profundo…',
				'Enviando nada a tu puerta…'
			]
		},
		success: {
			title: 'Pedido confirmado. La nada va en camino.',
			subtitle:
				'Gracias por tu pedido. Como prometimos, se cobraron 0,00 $ y se enviaron exactamente 0 pizzas.',
			mascotAlt: 'Tu pizza ha llegado: un vacío perfecto.',
			orderNo: 'Pedido',
			charged: 'Cobrado',
			etaLabel: 'No llegada estimada',
			eta: 'Nunca',
			trackingTitle: 'No seguimiento en directo',
			stages: ['Pedido recibido', 'Sin preparar', 'Salió para no entregarse', 'Sin llegar nunca'],
			receiptNote: 'No se te ha enviado por correo ningún recibo de nada.',
			again: 'Pedir nada otra vez',
			home: 'Volver al inicio'
		}
	}
};
