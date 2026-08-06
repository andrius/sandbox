import type { Locale } from '$lib/i18n';

/**
 * "The President and the Queen" - division 05.
 *
 * Ported from a standalone artifact that already carried all three languages,
 * so nothing here is machine-translated: the Russian and Dutch are the
 * author's. Two things changed in transit. Em-dashes became " - " to match
 * the house style every other locale file uses, and the artifact's private
 * en/ru/nl switcher was dropped in favour of the shared `locale` store, so a
 * visitor who picked Dutch on the menu arrives here already in Dutch.
 */

export interface AntsChapter {
	label: string;
	title: string;
	body: string[];
	caption: string;
}

/** One clause of the treaty: `t` is its name, `d` the promise. */
export interface AntsTerm {
	t: string;
	d: string;
}

export interface AntsDict {
	brand: string;
	kicker: string;
	title: string;
	subtitle: string;
	/** The designation given to the deported forest ants. */
	modelName: string;
	badgeQueen: string;
	badgeTreaty: string;
	scrollHint: string;
	/**
	 * Accessible descriptions of the five drawings.
	 *
	 * The illustrations carry as much of the story as the prose does - the
	 * queen's shed wings and the chessboard pose are plot, not decoration - so
	 * they are described rather than hidden, and described in the reader's own
	 * language like everything else on the page.
	 */
	art: {
		hero: string;
		palace: string;
		terminators: string;
		queen: string;
		alliance: string;
	};
	s1: AntsChapter;
	s2: AntsChapter;
	s3: AntsChapter;
	s4: AntsChapter;
	treatyTitle: string;
	treatyNote: string;
	terms: { shield: AntsTerm; beach: AntsTerm; cookie: AntsTerm };
	decreeTitle: string;
	decreeSub: string;
	decree: string[];
	signPresident: string;
	signQueen: string;
	footNote: string;
}

export const antsContent: Record<Locale, AntsDict> = {
  en: {
    brand: "Presidential Republic of the Bottle",
    kicker: "A tale from the Baltic coast",
    title: "The President and the Queen",
    subtitle: "A summer dispatch from Palanga, in which a ten-year-old head of state goes looking for an Ant Queen - and finds a monarch who moves like a chess piece.",
    modelName: "T-ANT",
    badgeQueen: "One Queen, wingless",
    badgeTreaty: "One treaty, three terms",
    scrollHint: "scroll down - the expedition begins",
    art: {
      hero: "Palanga beach with pine forest, dune and a shampoo-bottle palace",
      palace: "A translucent shampoo bottle palace with a crown drawn on its label, standing in sand",
      terminators: "Two big red forest ants with angry eyebrows in tactical stances",
      queen: "An elegant glossy black ant queen on a sandy path, her discarded translucent wings lying nearby",
      alliance: "The queen ant seated in the middle of the bottle palace like a chess queen on d8, beside a dune at sunset"
    },
    s1: {
      label: "Chapter one",
      title: "The Palace",
      body: [
        "Every president needs a residence. President Sasha had one - a shampoo bottle, thoroughly rinsed and disinfected with Palanga seawater.",
        "All that remained was to find someone to govern.",
        "\u201CDad,\u201D said the President, blowing his fringe aside. \u201CWe need the Ant Queen. For diplomatic relations.\u201D",
        "Papa Andrius was appointed Special Assistant and agreed, since there was no escape: vacation."
      ],
      caption: "Temporary Presidential Palace, Palanga. Capacity: one monarch."
    },
    s2: {
      label: "Chapter two - Expedition One",
      title: "The Terminators",
      body: [
        "The first expedition went into the pine forest. The hunt was brutal: the targets ran like commandos, bit like commandos, and smelled like something very sour. Two prisoners were taken - huge, red, ferocious. Inside the bottle-palace they immediately staged a riot and an escape attempt through the neck.",
        "\u201CThese are not queens,\u201D the President said grimly, inspecting the captives. \u201CThese are terminators. Forest ones. Red ones. Model T-ANT.\u201D",
        "The terminators were deported back to the forest with full honors - the President was strict but fair."
      ],
      caption: "Exhibits A & B: hostile fauna. Angry eyebrows verified."
    },
    s3: {
      label: "Chapter three",
      title: "The Miracle",
      body: [
        "And a day later, on a path right by the sea, a miracle happened. She walked alone, unhurried, glossy and black, elegant as a chess piece that got tired of standing on the board and went for a stroll.",
        "Her wings were already shed - queens do that after their wedding flight.",
        "\u201CYour Majesty,\u201D whispered the President, and bowed."
      ],
      caption: "The Queen. Wingless by choice. Moves in all directions."
    },
    s4: {
      label: "Chapter four",
      title: "The Alliance",
      body: [
        "The Queen was invited to the palace. She entered with dignity, inspected the chambers, and settled in the center - exactly like a queen on d8.",
        "The two states formed an alliance. The President promised protection, a sandy beach, and cookie crumbs. The Queen promised to think about it.",
        "In the evening she was ceremonially released by the dune - to build a real kingdom."
      ],
      caption: "Signing ceremony. Ink: none. Witnesses: two thousand grains of sand."
    },
    treatyTitle: "The Treaty of the Bottle",
    treatyNote: "Ratified on the beach, unanimously, by one President and one Queen.",
    terms: {
      shield: { t: "Protection", d: "No seagull, no cousin and no sandal shall trouble Her Majesty inside her borders." },
      beach: { t: "A sandy beach", d: "Granted in freehold, from the third pine down to the waterline." },
      cookie: { t: "Cookie crumbs", d: "Delivered daily. Butter variety preferred; jam is negotiable." }
    },
    decreeTitle: "Presidential Decree No. 1",
    decreeSub: "Written in a squared notebook, third page from the back",
    decree: [
      "The dune between the third and the fourth pine is hereby the Queendom of the Black Ant.",
      "All citizens will walk around it, quietly, and on tiptoe if the wind is loud.",
      "Crumbs on Sundays. The T-ANT model remains deported until it apologises.",
      "\u201CDiplomacy is when everyone leaves happy. Even the terminators.\u201D"
    ],
    signPresident: "The President, age 10",
    signQueen: "The Queen, age unknown",
    footNote: "The President and the Queen - a summer story from Palanga. No people were drawn in the making of this republic."
  },
  ru: {
    brand: "Президентская Республика Бутылки",
    kicker: "История с балтийского берега",
    title: "Президент и Королева",
    subtitle: "Летняя депеша из Паланги, в которой десятилетний глава государства ищет Королеву муравьёв - и находит монарха, который ходит как шахматная фигура.",
    modelName: "Т-МУРАВЕЙ",
    badgeQueen: "Одна Королева, без крыльев",
    badgeTreaty: "Один договор, три пункта",
    scrollHint: "листай вниз - экспедиция начинается",
    art: {
      hero: "Пляж Паланги: сосновый лес, дюна и дворец из флакончика шампуня",
      palace: "Полупрозрачный дворец из флакончика шампуня с короной, нарисованной на этикетке, стоит в песке",
      terminators: "Два больших рыжих лесных муравья со злыми бровями в боевых стойках",
      queen: "Элегантная блестящая чёрная королева муравьёв на песчаной дорожке, рядом лежат сброшенные прозрачные крылья",
      alliance: "Королева сидит в центре дворца-флакончика, как ферзь на d8, у дюны на закате"
    },
    s1: {
      label: "Глава первая",
      title: "Дворец",
      body: [
        "У каждого президента должна быть резиденция. У Президента Саши она была - флакончик из-под шампуня, тщательно вымытый и продезинфицированный морской водой Паланги.",
        "Оставалось найти, кем управлять.",
        " - Папа, - сказал Президент, сдув чёлку. - Нам нужна Королева Муравьёв. Для дипломатических отношений.",
        "Папа Андрюс был назначен помощником по особым поручениям и согласился, потому что деваться было некуда: отпуск."
      ],
      caption: "Временный президентский дворец, Паланга. Вместимость: один монарх."
    },
    s2: {
      label: "Глава вторая - Экспедиция первая",
      title: "Терминаторы",
      body: [
        "Первая экспедиция ушла в сосновый лес. Охота была жёсткой: объекты бегали, как спецназ, кусались, как спецназ, и пахли, как что-то очень кислое. В плен взяли двоих - огромных, рыжих, свирепых. Во дворце-флакончике они немедленно устроили разгром и попытку побега через горлышко.",
        " - Это не королевы, - мрачно сказал Президент, разглядывая пленных. - Это терминаторы. Лесные. Рыжие. Модель Т-МУРАВЕЙ.",
        "Терминаторов с почестями депортировали обратно в лес - Президент был строг, но справедлив."
      ],
      caption: "Улики А и Б: враждебная фауна. Злые брови подтверждены."
    },
    s3: {
      label: "Глава третья",
      title: "Чудо",
      body: [
        "А через день, на дорожке у самого моря, случилось чудо. Она шла одна, не спеша, блестящая и чёрная, элегантная, как шахматная фигура, которая устала стоять на доске и ушла гулять.",
        "Крылья она уже сбросила - королевы после свадебного полёта так делают.",
        " - Ваше Величество, - прошептал Президент и поклонился."
      ],
      caption: "Королева. Без крыльев - по собственному решению. Ходит во все стороны."
    },
    s4: {
      label: "Глава четвёртая",
      title: "Союз",
      body: [
        "Королеву пригласили во дворец. Она вошла с достоинством, осмотрела покои и села в центре - ровно как ферзь на d8.",
        "Два государства заключили союз. Президент обещал охрану, песчаный пляж и крошки печенья. Королева обещала подумать.",
        "Вечером её торжественно выпустили у дюны - строить настоящее королевство."
      ],
      caption: "Церемония подписания. Чернил: нет. Свидетелей: две тысячи песчинок."
    },
    treatyTitle: "Договор Бутылки",
    treatyNote: "Ратифицирован на пляже единогласно: один Президент и одна Королева.",
    terms: {
      shield: { t: "Защита", d: "Ни чайка, ни двоюродный муравей, ни сандалия не потревожат Её Величество в её границах." },
      beach: { t: "Песчаный пляж", d: "Передаётся в собственность: от третьей сосны до линии воды." },
      cookie: { t: "Крошки печенья", d: "Доставка ежедневно. Предпочтительно песочное; насчёт варенья можно договориться." }
    },
    decreeTitle: "Президентский указ № 1",
    decreeSub: "Записано в тетради в клетку, на третьей странице с конца",
    decree: [
      "Дюна между третьей и четвёртой сосной объявляется Королевством Чёрного Муравья.",
      "Всем гражданам обходить её стороной, тихо, а при сильном ветре - на цыпочках.",
      "Крошки по воскресеньям. Модель Т-МУРАВЕЙ остаётся выдворенной, пока не извинится.",
      "«Дипламатия - это когда все ушли давольные. Даже терминаторы»."
    ],
    signPresident: "Президент, 10 лет",
    signQueen: "Королева, лет неизвестно",
    footNote: "Президент и Королева - летняя история из Паланги. При создании этой республики не было нарисовано ни одного человека."
  },
  nl: {
    brand: "Presidentiële Republiek van de Fles",
    kicker: "Een verhaal van de Baltische kust",
    title: "De President en de Koningin",
    subtitle: "Een zomerbericht uit Palanga, waarin een tienjarig staatshoofd op zoek gaat naar een Mierenkoningin - en een vorst vindt die beweegt als een schaakstuk.",
    modelName: "T-MIER",
    badgeQueen: "Eén Koningin, vleugelloos",
    badgeTreaty: "Eén verdrag, drie artikelen",
    scrollHint: "scroll naar beneden - de expeditie begint",
    art: {
      hero: "Het strand van Palanga met dennenbos, duin en een paleis van een shampoofles",
      palace: "Een doorschijnend paleis van een shampoofles met een kroon op het etiket, staand in het zand",
      terminators: "Twee grote rode bosmieren met boze wenkbrauwen in gevechtshouding",
      queen: "Een elegante glanzend zwarte mierenkoningin op een zandpad, met haar afgeworpen doorschijnende vleugels ernaast",
      alliance: "De koningin zit midden in het flessenpaleis als een dame op d8, naast een duin bij zonsondergang"
    },
    s1: {
      label: "Hoofdstuk één",
      title: "Het Paleis",
      body: [
        "Elke president heeft een residentie nodig. President Sasha had er één - een shampoofles, grondig gespoeld en gedesinfecteerd met zeewater uit Palanga.",
        "Nu moest er alleen nog iemand gevonden worden om over te regeren.",
        "\u201CPapa,\u201D zei de President, terwijl hij zijn pony wegblies. \u201CWe hebben de Mierenkoningin nodig. Voor diplomatieke betrekkingen.\u201D",
        "Papa Andrius werd benoemd tot Speciaal Assistent en stemde toe, want ontsnappen was onmogelijk: vakantie."
      ],
      caption: "Tijdelijk Presidentieel Paleis, Palanga. Capaciteit: één vorst."
    },
    s2: {
      label: "Hoofdstuk twee - Expeditie Eén",
      title: "De Terminators",
      body: [
        "De eerste expeditie trok het dennenbos in. De jacht was hard: de doelwitten renden als commando's, beten als commando's en roken naar iets heel zuurs. Twee gevangenen werden gemaakt - enorm, rood, woest. In het flessenpaleis begonnen ze meteen een opstand en een ontsnappingspoging door de hals.",
        "\u201CDit zijn geen koninginnen,\u201D zei de President somber, terwijl hij de gevangenen bekeek. \u201CDit zijn terminators. Bosterminators. Rode. Model T-MIER.\u201D",
        "De terminators werden met alle egards teruggebracht naar het bos - de President was streng maar rechtvaardig."
      ],
      caption: "Bewijsstuk A & B: vijandige fauna. Boze wenkbrauwen bevestigd."
    },
    s3: {
      label: "Hoofdstuk drie",
      title: "Het Wonder",
      body: [
        "En een dag later, op een paadje vlak bij zee, gebeurde er een wonder. Ze liep alleen, rustig, glanzend en zwart, elegant als een schaakstuk dat het zat was om op het bord te staan en een wandeling ging maken.",
        "Haar vleugels had ze al afgeworpen - dat doen koninginnen na hun bruidsvlucht.",
        "\u201CMajesteit,\u201D fluisterde de President, en hij boog."
      ],
      caption: "De Koningin. Vleugelloos uit vrije keuze. Beweegt in alle richtingen."
    },
    s4: {
      label: "Hoofdstuk vier",
      title: "Het Bondgenootschap",
      body: [
        "De Koningin werd uitgenodigd in het paleis. Ze trad binnen met waardigheid, inspecteerde de vertrekken en nam plaats in het midden - precies als een dame op d8.",
        "De twee staten sloten een verbond. De President beloofde bescherming, een zandstrand en koekkruimels. De Koningin beloofde erover na te denken.",
        "'s Avonds werd ze plechtig vrijgelaten bij het duin - om een echt koninkrijk te bouwen."
      ],
      caption: "Ondertekeningsceremonie. Inkt: geen. Getuigen: tweeduizend zandkorrels."
    },
    treatyTitle: "Het Verdrag van de Fles",
    treatyNote: "Op het strand geratificeerd, met algemene stemmen: één President en één Koningin.",
    terms: {
      shield: { t: "Bescherming", d: "Geen meeuw, geen neef en geen sandaal zal Hare Majesteit binnen haar grenzen storen." },
      beach: { t: "Een zandstrand", d: "In volle eigendom, van de derde pijnboom tot de waterlijn." },
      cookie: { t: "Koekkruimels", d: "Dagelijks bezorgd. Bij voorkeur van boterkoek; over jam valt te praten." }
    },
    decreeTitle: "Presidentieel Decreet Nr. 1",
    decreeSub: "Geschreven in een ruitjesschrift, derde bladzijde van achteren",
    decree: [
      "De duin tussen de derde en de vierde pijnboom is hierbij het Koninginnenrijk van de Zwarte Mier.",
      "Alle burgers lopen eromheen, stil, en op hun tenen als de wind hard staat.",
      "Kruimels op zondag. Model T-MIER blijft uitgezet tot het zich verontschuldigt.",
      "\u201CDiplomatie is als iedereen tevreden weggaat. Zelfs de terminators.\u201D"
    ],
    signPresident: "De President, 10 jaar",
    signQueen: "De Koningin, leeftijd onbekend",
    footNote: "De President en de Koningin - een zomerverhaal uit Palanga. Er zijn geen mensen getekend bij het stichten van deze republiek."
  },
  es: {
    brand: "República Presidencial de la Botella",
    kicker: "Una historia de la costa báltica",
    title: "El Presidente y la Reina",
    subtitle: "Un despacho veraniego desde Palanga, en el que un jefe de Estado de diez años sale a buscar a la Reina de las Hormigas - y encuentra a una monarca que se mueve como una pieza de ajedrez.",
    modelName: "T-HORMIGA",
    badgeQueen: "Una Reina, sin alas",
    badgeTreaty: "Un tratado, tres cláusulas",
    scrollHint: "baja - la expedición comienza",
    art: {
      hero: "La playa de Palanga con pinar, duna y un palacio hecho con un frasco de champú",
      palace: "Un palacio translúcido hecho con un frasco de champú, con una corona dibujada en la etiqueta, de pie sobre la arena",
      terminators: "Dos grandes hormigas rojas del bosque con las cejas enfadadas en postura de combate",
      queen: "Una elegante reina hormiga, negra y brillante, en un sendero de arena, con sus alas translúcidas desprendidas al lado",
      alliance: "La reina sentada en el centro del palacio-frasco como una dama en d8, junto a una duna al atardecer"
    },
    s1: {
      label: "Capítulo uno",
      title: "El Palacio",
      body: [
        "Todo presidente necesita una residencia. El Presidente Sasha tenía una - un frasco de champú, enjuagado a fondo y desinfectado con agua de mar de Palanga.",
        "Solo faltaba encontrar a alguien a quien gobernar.",
        "“Papá”, dijo el Presidente, apartándose el flequillo de un soplido. “Necesitamos a la Reina de las Hormigas. Para las relaciones diplomáticas.”",
        "Papá Andrius fue nombrado Asistente Especial y aceptó, porque no había escapatoria: vacaciones."
      ],
      caption: "Palacio Presidencial Provisional, Palanga. Capacidad: una monarca."
    },
    s2: {
      label: "Capítulo dos - Primera expedición",
      title: "Los Terminators",
      body: [
        "La primera expedición se adentró en el pinar. La caza fue dura: los objetivos corrían como comandos, mordían como comandos y olían a algo muy ácido. Se capturaron dos prisioneras - enormes, rojas, feroces. Dentro del palacio-frasco montaron de inmediato un motín y un intento de fuga por el cuello.",
        "“Estas no son reinas”, dijo el Presidente con gravedad, examinando a las cautivas. “Estas son terminators. Del bosque. Rojas. Modelo T-HORMIGA.”",
        "Las terminators fueron deportadas al bosque con todos los honores - el Presidente era estricto, pero justo."
      ],
      caption: "Pruebas A y B: fauna hostil. Cejas enfadadas verificadas."
    },
    s3: {
      label: "Capítulo tres",
      title: "El Milagro",
      body: [
        "Y un día después, en un sendero junto al mar, ocurrió el milagro. Caminaba sola, sin prisa, brillante y negra, elegante como una pieza de ajedrez que se cansó de estar en el tablero y salió a pasear.",
        "Ya se había desprendido de las alas - las reinas lo hacen después del vuelo nupcial.",
        "“Su Majestad”, susurró el Presidente, y se inclinó."
      ],
      caption: "La Reina. Sin alas por decisión propia. Se mueve en todas las direcciones."
    },
    s4: {
      label: "Capítulo cuatro",
      title: "La Alianza",
      body: [
        "La Reina fue invitada al palacio. Entró con dignidad, inspeccionó los aposentos y se instaló en el centro - exactamente como una dama en d8.",
        "Los dos Estados formaron una alianza. El Presidente prometió protección, una playa de arena y migas de galleta. La Reina prometió pensárselo.",
        "Por la tarde fue liberada solemnemente junto a la duna - para construir un reino de verdad."
      ],
      caption: "Ceremonia de firma. Tinta: ninguna. Testigos: dos mil granos de arena."
    },
    treatyTitle: "El Tratado de la Botella",
    treatyNote: "Ratificado en la playa, por unanimidad, por un Presidente y una Reina.",
    terms: {
      shield: { t: "Protección", d: "Ninguna gaviota, ninguna prima y ninguna sandalia molestarán a Su Majestad dentro de sus fronteras." },
      beach: { t: "Una playa de arena", d: "Cedida en plena propiedad, desde el tercer pino hasta la orilla del agua." },
      cookie: { t: "Migas de galleta", d: "Entrega diaria. Se prefiere la mantequilla; la mermelada es negociable." }
    },
    decreeTitle: "Decreto Presidencial n.º 1",
    decreeSub: "Escrito en un cuaderno cuadriculado, tercera página empezando por el final",
    decree: [
      "La duna entre el tercer y el cuarto pino queda constituida como Reinado de la Hormiga Negra.",
      "Todos los ciudadanos la rodearán, en silencio, y de puntillas si el viento sopla fuerte.",
      "Migas los domingos. El modelo T-HORMIGA sigue deportado hasta que pida perdón.",
      "«La diplomacia es cuando todos se van contentos. Incluso los terminators»."
    ],
    signPresident: "El Presidente, 10 años",
    signQueen: "La Reina, edad desconocida",
    footNote: "El Presidente y la Reina - una historia de verano desde Palanga. No se dibujó a ninguna persona durante la fundación de esta república."
  }
};
