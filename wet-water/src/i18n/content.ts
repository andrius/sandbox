// Trilingual copy for Wet Water, ported verbatim from the original design export.
// EN / RU / NL. Edit text here; structure is enforced by the Dict type below.

export type Lang = 'en' | 'ru' | 'nl';

export interface Dict {
  tagline: string;
  factTitle: string;
  thermLabel: string;
  loading: string;
  nav: { product: string; survive: string; partners: string; pricing: string; faq: string; getWater: string };
  hero: { kicker: string; headline: string; subhead: string; cta1: string; cta2: string; trust: string };
  fact: { label: string; value: string; note: string }[];
  trustedRow: { label: string; items: string[] };
  problem: { label: string; title: string; body: string };
  reveal: { headline: string; body: string; sub: string; cta: string };
  partners: {
    eyebrow: string; title: string; note: string;
    cards: { icon: string; name: string; desc: string; button: string }[];
  };
  features: { title: string; items: { icon: string; title: string; desc: string }[] };
  surviveEyebrow: string;
  guideHome: { title: string; steps: string[] };
  guideBody: { title: string; steps: string[] };
  pricing: {
    eyebrow: string; title: string; popularBadge: string; footnote: string;
    tiers: { name: string; price: string; desc: string; button: string; popular: boolean }[];
  };
  testimonials: { title: string; items: { quote: string; author: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: {
    statement: string; legal: string; backToTop: string;
    newsletter: string; newsletterThanks: string; subscribe: string; placeholder: string;
  };
  cookie: { text: string; accept: string; dismiss: string };
}

export const PROBLEM_NUMBER = '+33…+43°C';

export const langs: Lang[] = ['en', 'ru', 'nl'];

export const localeNames: Record<Lang, string> = { en: 'EN', ru: 'RU', nl: 'NL' };

export const locales: Record<Lang, Dict> = {
  "en": {
    "tagline": "Water. But wet.",
    "factTitle": "FACTS",
    "thermLabel": "cooling",
    "loading": "Boiling… cooling… condensing… 💧",
    "nav": {
      "product": "Product",
      "survive": "Survive the heat",
      "partners": "Partners",
      "pricing": "Pricing",
      "faq": "FAQ",
      "getWater": "Get water"
    },
    "hero": {
      "kicker": "Endorsed by gravity · Winner: “Most Like Water,” 14 billion years running",
      "headline": "We didn’t invent water. We just put it in a nicer bottle and believed in ourselves.",
      "subhead": "The first water in Europe with certified wetness. Responsibly sourced from clouds, rivers, and one very generous tap. Stays wet up to +43°C.",
      "cta1": "Get water now",
      "cta2": "I’m thirsty",
      "trust": "Trusted by 7.8 billion humans"
    },
    "fact": [
      {
        "label": "Outside",
        "value": "43°C 🔥",
        "note": "(too much)"
      },
      {
        "label": "Wetness",
        "value": "100%",
        "note": "(as promised)"
      },
      {
        "label": "Calories",
        "value": "0",
        "note": "(checked twice)"
      },
      {
        "label": "Ingredients",
        "value": "water",
        "note": "(that’s the whole list)"
      },
      {
        "label": "Source",
        "value": "a cloud, probably",
        "note": ""
      }
    ],
    "trustedRow": {
      "label": "Trusted by:",
      "items": [
        "your kidneys",
        "every houseplant",
        "the Mediterranean",
        "sweat",
        "ice-cube makers",
        "the entire concept of soup"
      ]
    },
    "problem": {
      "label": "Current conditions",
      "title": "Europe is overheating.",
      "body": "The asphalt is melting, the city is sighing, and your body is quietly cooking. Heatstroke doesn’t care who you are."
    },
    "reveal": {
      "headline": "We make water wet. We don’t sell it — our partners do.",
      "body": "Full honesty: we sell the idea that water — which you already have — is great. The water itself comes from our partners. Go on.",
      "sub": "Think of us as a middleman who adds nothing. Like most middlemen.",
      "cta": "Buy water from our partners"
    },
    "partners": {
      "eyebrow": "Authorized hydration partners",
      "title": "Get water, delivered or nearby",
      "note": "// Partner slots — drop your affiliate links here.",
      "cards": [
        {
          "icon": "🛒",
          "name": "Supermarket",
          "desc": "Bottled water, today. Walking there counts as exercise.",
          "button": "Shop now"
        },
        {
          "icon": "🚚",
          "name": "Delivery",
          "desc": "Cases to your door — going outside is cancelled today.",
          "button": "Order delivery"
        },
        {
          "icon": "💧",
          "name": "Subscription",
          "desc": "Water, but forever. Like a pet that never dies.",
          "button": "Subscribe"
        },
        {
          "icon": "🥤",
          "name": "Bring your own bottle",
          "desc": "The cheapest option, and the planet says thanks.",
          "button": "Find a tap"
        }
      ]
    },
    "features": {
      "title": "Things you didn’t know water could do",
      "items": [
        {
          "icon": "💧",
          "title": "100% wet",
          "desc": "every drop, guaranteed"
        },
        {
          "icon": "❄️",
          "title": "Works with ice",
          "desc": "add cold, get colder"
        },
        {
          "icon": "☁️",
          "title": "Cloud-sourced",
          "desc": "literally fell from the sky"
        },
        {
          "icon": "🔁",
          "title": "Infinitely refillable",
          "desc": "ran out? Add more"
        },
        {
          "icon": "🚫",
          "title": "Sugar-free, gluten-free, free-free",
          "desc": ""
        },
        {
          "icon": "🌍",
          "title": "Endorsed by 71% of the planet’s surface",
          "desc": ""
        }
      ]
    },
    "surviveEyebrow": "Survival guide",
    "guideHome": {
      "title": "How to cool your home without an AC (without selling a kidney)",
      "steps": [
        "Close curtains/blinds by day — glass is the biggest heat source; prioritize south and west.",
        "At night and dawn — cross-breeze (windows on opposite sides).",
        "A wet sheet in front of an open window or fan — evaporative cooling.",
        "Fan + a bowl of ice = a poor man’s AC.",
        "Switch off anything that heats: oven, stove, incandescent bulbs.",
        "Warm air rises — sleep low."
      ]
    },
    "guideBody": {
      "title": "How not to melt: a guide for humans",
      "steps": [
        "Drink before you’re thirsty; alcohol and coffee dehydrate.",
        "Heavy sweating → electrolytes (salt, potassium, magnesium).",
        "Avoid the sun 11:00–17:00.",
        "Cool your pulse points: wrists, neck.",
        "Cool — not ice-cold — shower; light, loose clothing.",
        "⚠️ Heatstroke (hot dry skin, confusion, nausea) — call 112."
      ]
    },
    "pricing": {
      "eyebrow": "Pricing",
      "title": "Simple, transparent, mostly water",
      "popularBadge": "Most popular",
      "footnote": "The water is identical in every plan. This is the most honest pricing page on the internet.",
      "tiers": [
        {
          "name": "Free",
          "price": "€0",
          "desc": "Tap water. Wetness included. No bottle, no respect from guests.",
          "button": "Start free",
          "popular": false
        },
        {
          "name": "Pro",
          "price": "€9",
          "desc": "Same water, prettier bottle. Now you look like you have your life together.",
          "button": "Go Pro",
          "popular": true
        },
        {
          "name": "Family",
          "price": "€29",
          "desc": "Enough for everyone, including the relatives who only visit when it’s hot.",
          "button": "Choose Family",
          "popular": false
        },
        {
          "name": "Enterprise",
          "price": "Let’s talk",
          "desc": "A pool. Air conditioning. A rain dance. Relocation to Norway.",
          "button": "Contact sales",
          "popular": false
        }
      ]
    },
    "testimonials": {
      "title": "Loved by hydrated people",
      "items": [
        {
          "quote": "I drank Wet Water and it was, in fact, wet. Exactly as advertised — a rare thing these days.",
          "author": "Sergei, professional skeptic"
        },
        {
          "quote": "Switched from a competitor’s dry water. Never going back.",
          "author": "Anna, hydration enthusiast"
        },
        {
          "quote": "Five stars. It is water.",
          "author": "a glass of water (verified purchase)"
        },
        {
          "quote": "I’m a houseplant and this changed everything. Mostly because they finally watered me.",
          "author": "Brian, a fern"
        },
        {
          "quote": "10/10, would be liquid again.",
          "author": "the ocean"
        }
      ]
    },
    "faq": {
      "title": "FAQ",
      "items": [
        {
          "q": "Is the water actually wet?",
          "a": "Yes. That’s our entire business model."
        },
        {
          "q": "How is it different from regular water?",
          "a": "It isn’t. We’re as surprised as you are."
        },
        {
          "q": "Why pay if tap water is free?",
          "a": "The bottle. And the feeling of having made a choice."
        },
        {
          "q": "…wait, is the name a—?",
          "a": "It’s water. Get your mind out of the gutter."
        },
        {
          "q": "How much should I drink in the heat?",
          "a": "~2–3 L/day, more with activity and sweating; pale urine = good."
        },
        {
          "q": "Where do I actually buy it?",
          "a": "From our partners above. That’s literally the point."
        }
      ]
    },
    "footer": {
      "statement": "Official statement: on June 24th, the Sun went too far. We’ve filed a complaint. Meanwhile — close your curtains.",
      "legal": "Wet Water™ — water the way nature intended, now with a landing page. Wetness not guaranteed below 0°C. The jokes are jokes; the heat advice is not.",
      "backToTop": "↑ come up for air",
      "newsletter": "Hydration updates. Max one drop per week.",
      "newsletterThanks": "💧 One drop, incoming.",
      "subscribe": "Get drops",
      "placeholder": "you@hydrated.com"
    },
    "cookie": {
      "text": "We use cookies. And water. Mostly water.",
      "accept": "Accept",
      "dismiss": "Go drink something"
    }
  },
  "ru": {
    "tagline": "Вода. Но мокрая.",
    "factTitle": "ФАКТЫ",
    "thermLabel": "охлаждение",
    "loading": "Кипячу… охлаждаю… конденсирую… 💧",
    "nav": {
      "product": "Продукт",
      "survive": "Пережить жару",
      "partners": "Партнёры",
      "pricing": "Цены",
      "faq": "FAQ",
      "getWater": "Купить воду"
    },
    "hero": {
      "kicker": "Одобрено гравитацией · Победитель в номинации «Больше всего похоже на воду», 14 млрд лет подряд",
      "headline": "Мы не изобретали воду. Просто налили в бутылку покрасивее и поверили в себя.",
      "subhead": "Первая в Европе вода с сертифицированной влажностью. Ответственно добыта из облаков, рек и одного очень щедрого крана. Остаётся мокрой до +43°C.",
      "cta1": "Забрать воду",
      "cta2": "Я хочу пить",
      "trust": "Нам доверяют 7,8 млрд человек"
    },
    "fact": [
      {
        "label": "Снаружи",
        "value": "43°C 🔥",
        "note": "(перебор)"
      },
      {
        "label": "Влажность",
        "value": "100%",
        "note": "(как обещали)"
      },
      {
        "label": "Калорий",
        "value": "0",
        "note": "(проверили дважды)"
      },
      {
        "label": "Состав",
        "value": "вода",
        "note": "(весь список)"
      },
      {
        "label": "Источник",
        "value": "какое-то облако, наверное",
        "note": ""
      }
    ],
    "trustedRow": {
      "label": "Вам доверяют:",
      "items": [
        "ваши почки",
        "каждый комнатный цветок",
        "Средиземное море",
        "пот",
        "производители льда",
        "сам концепт супа"
      ]
    },
    "problem": {
      "label": "Текущие условия",
      "title": "Европа перегревается.",
      "body": "Асфальт плавится, город вздыхает, а организм тихо варится. Тепловому удару всё равно, кто ты."
    },
    "reveal": {
      "headline": "Мы делаем воду мокрой. Но не продаём — это делают наши партнёры.",
      "body": "Честно: мы продаём идею, что вода — которая у вас уже есть — это прекрасно. А саму воду берите у партнёров. Идите.",
      "sub": "Считайте нас посредником, который не добавляет ничего. Как и большинство посредников.",
      "cta": "Купить воду у партнёров"
    },
    "partners": {
      "eyebrow": "Авторизованные партнёры по гидратации",
      "title": "Вода — с доставкой или рядом с домом",
      "note": "// Слоты партнёров — вставьте сюда свои аффилиат-ссылки.",
      "cards": [
        {
          "icon": "🛒",
          "name": "Супермаркет",
          "desc": "Бутилированная вода, сегодня. Дойти пешком — считается за спорт.",
          "button": "В магазин"
        },
        {
          "icon": "🚚",
          "name": "Доставка",
          "desc": "Упаковки к двери — на улицу сегодня отменяется.",
          "button": "Заказать доставку"
        },
        {
          "icon": "💧",
          "name": "Подписка",
          "desc": "Вода, но навсегда. Как питомец, который не умирает.",
          "button": "Оформить подписку"
        },
        {
          "icon": "🥤",
          "name": "Своя бутылка",
          "desc": "Самый дешёвый тариф, и планета передаёт спасибо.",
          "button": "Найти кран"
        }
      ]
    },
    "features": {
      "title": "Чего вы не знали о воде",
      "items": [
        {
          "icon": "💧",
          "title": "100% мокрая",
          "desc": "каждая капля, гарантия"
        },
        {
          "icon": "❄️",
          "title": "Совместима со льдом",
          "desc": "добавь холод, получи холоднее"
        },
        {
          "icon": "☁️",
          "title": "Из облака",
          "desc": "буквально упала с неба"
        },
        {
          "icon": "🔁",
          "title": "Бесконечно доливаемая",
          "desc": "кончилась? Долей ещё"
        },
        {
          "icon": "🚫",
          "title": "Без сахара, без глютена, без всего",
          "desc": ""
        },
        {
          "icon": "🌍",
          "title": "Одобрена 71% поверхности планеты",
          "desc": ""
        }
      ]
    },
    "surviveEyebrow": "Гид по выживанию",
    "guideHome": {
      "title": "Как охладить квартиру без кондиционера (не продавая почку)",
      "steps": [
        "Днём закрывай шторы/жалюзи — стекло греет сильнее всего; приоритет юг и запад.",
        "Ночью и на рассвете — сквозняк (окна на разных сторонах).",
        "Мокрая простыня перед открытым окном/вентилятором — испарительное охлаждение.",
        "Вентилятор + миска льда = «бедный кондиционер».",
        "Выключай всё, что греет: духовку, плиту, лампы накаливания.",
        "Тёплый воздух поднимается — спи ниже."
      ]
    },
    "guideBody": {
      "title": "Как не расплавиться: инструкция для людей",
      "steps": [
        "Пей до жажды; алкоголь и кофе обезвоживают.",
        "При сильном поте — электролиты (соль, калий, магний).",
        "Не выходи на солнце 11:00–17:00.",
        "Охлаждай пульсовые точки: запястья, шея.",
        "Прохладный, не ледяной душ; лёгкая свободная одежда.",
        "⚠️ Тепловой удар (сухая горячая кожа, спутанность, тошнота) — это 112."
      ]
    },
    "pricing": {
      "eyebrow": "Цены",
      "title": "Просто, прозрачно, в основном вода",
      "popularBadge": "Самый популярный",
      "footnote": "Во всех тарифах вода одинаковая. Это самая честная страница цен в интернете.",
      "tiers": [
        {
          "name": "Free",
          "price": "€0",
          "desc": "Вода из-под крана. Влажность включена. Без бутылки и без уважения гостей.",
          "button": "Начать бесплатно",
          "popular": false
        },
        {
          "name": "Pro",
          "price": "€9",
          "desc": "Та же вода, бутылка красивее. Теперь вы выглядите как человек, у которого всё под контролем.",
          "button": "Перейти на Pro",
          "popular": true
        },
        {
          "name": "Family",
          "price": "€29",
          "desc": "Воды хватит всем, включая родственников, которые приходят только в жару.",
          "button": "Выбрать Family",
          "popular": false
        },
        {
          "name": "Enterprise",
          "price": "Обсудить",
          "desc": "Бассейн. Кондиционер. Танец дождя. Переезд в Норвегию.",
          "button": "Связаться с продажами",
          "popular": false
        }
      ]
    },
    "testimonials": {
      "title": "Нас любят увлажнённые люди",
      "items": [
        {
          "quote": "Выпил Wet Water — и она правда мокрая. Точно как в рекламе. Редкость в наше время.",
          "author": "Сергей, профессиональный скептик"
        },
        {
          "quote": "Перешёл с сухой воды конкурента. Назад не вернусь.",
          "author": "Анна, гидроэнтузиаст"
        },
        {
          "quote": "Пять звёзд. Это вода.",
          "author": "стакан воды (подтверждённая покупка)"
        },
        {
          "quote": "Я комнатное растение, и это изменило мою жизнь. В основном потому, что меня наконец полили.",
          "author": "Борис, папоротник"
        },
        {
          "quote": "10/10, согласился бы стать жидкостью снова.",
          "author": "океан"
        }
      ]
    },
    "faq": {
      "title": "FAQ",
      "items": [
        {
          "q": "Вода действительно мокрая?",
          "a": "Да. На этом построен весь наш бизнес."
        },
        {
          "q": "Чем она отличается от обычной воды?",
          "a": "Ничем. Мы сами в шоке."
        },
        {
          "q": "Зачем платить, если вода из-под крана бесплатна?",
          "a": "Бутылка. И ощущение, что вы сделали выбор."
        },
        {
          "q": "…погодите, название — это что-то…?",
          "a": "Это вода. Выньте мысли из канавы."
        },
        {
          "q": "Сколько пить в жару?",
          "a": "~2–3 л/день, больше при нагрузке и поте; светлая моча = норма."
        },
        {
          "q": "А где её вообще купить?",
          "a": "У партнёров выше. В этом весь смысл."
        }
      ]
    },
    "footer": {
      "statement": "Официальное заявление: 24 июня Солнце зашло слишком далеко. Мы подали жалобу. А пока — закройте шторы.",
      "legal": "Wet Water™ — вода, какой её задумала природа, только теперь с лендингом. Мокрость не гарантируется ниже 0°C. Шутки — это шутки, а советы по жаре — нет.",
      "backToTop": "↑ всплыть за воздухом",
      "newsletter": "Сводки влажности. Не больше капли в неделю.",
      "newsletterThanks": "💧 Капля уже в пути.",
      "subscribe": "Подписаться",
      "placeholder": "вы@вода.рф"
    },
    "cookie": {
      "text": "Мы используем cookies. И воду. В основном воду.",
      "accept": "Принять",
      "dismiss": "Лучше попить"
    }
  },
  "nl": {
    "tagline": "Water. Maar dan nat.",
    "factTitle": "FEITEN",
    "thermLabel": "koelen",
    "loading": "Koken… koelen… condenseren… 💧",
    "nav": {
      "product": "Product",
      "survive": "Hitte overleven",
      "partners": "Partners",
      "pricing": "Prijzen",
      "faq": "FAQ",
      "getWater": "Water kopen"
    },
    "hero": {
      "kicker": "Aanbevolen door de zwaartekracht · Winnaar ‘Meest op water lijkend’, 14 miljard jaar op rij",
      "headline": "We hebben water niet uitgevonden. We hebben het gewoon in een mooiere fles gedaan en in onszelf geloofd.",
      "subhead": "Het eerste water in Europa met gecertificeerde natheid. Verantwoord gewonnen uit wolken, rivieren en één heel gulle kraan. Blijft nat tot +43°C.",
      "cta1": "Water halen",
      "cta2": "Ik heb dorst",
      "trust": "Vertrouwd door 7,8 miljard mensen"
    },
    "fact": [
      {
        "label": "Buiten",
        "value": "43°C 🔥",
        "note": "(te veel)"
      },
      {
        "label": "Natheid",
        "value": "100%",
        "note": "(zoals beloofd)"
      },
      {
        "label": "Calorieën",
        "value": "0",
        "note": "(twee keer gecontroleerd)"
      },
      {
        "label": "Ingrediënten",
        "value": "water",
        "note": "(de hele lijst)"
      },
      {
        "label": "Bron",
        "value": "een wolk, waarschijnlijk",
        "note": ""
      }
    ],
    "trustedRow": {
      "label": "Vertrouwd door:",
      "items": [
        "je nieren",
        "elke kamerplant",
        "de Middellandse Zee",
        "zweet",
        "ijsblokjesmakers",
        "het hele concept soep"
      ]
    },
    "problem": {
      "label": "Huidige omstandigheden",
      "title": "Europa oververhit.",
      "body": "Het asfalt smelt, de stad zucht en je lichaam staat stilletjes te koken. Een hitteberoerte maakt het niet uit wie je bent."
    },
    "reveal": {
      "headline": "Wij maken water nat. Verkopen doen we niet — dat doen onze partners.",
      "body": "Eerlijk: wij verkopen het idee dat water — dat je al hebt — geweldig is. Het water zelf komt van onze partners. Ga maar.",
      "sub": "Zie ons als een tussenpersoon die niets toevoegt. Net als de meeste tussenpersonen.",
      "cta": "Water kopen bij onze partners"
    },
    "partners": {
      "eyebrow": "Erkende hydratiepartners",
      "title": "Water, bezorgd of om de hoek",
      "note": "// Partnerplekken — zet hier je affiliate-links.",
      "cards": [
        {
          "icon": "🛒",
          "name": "Supermarkt",
          "desc": "Flessenwater, vandaag nog. Ernaartoe lopen telt als sport.",
          "button": "Naar de winkel"
        },
        {
          "icon": "🚚",
          "name": "Bezorging",
          "desc": "Kratten aan je deur — naar buiten gaan is vandaag afgelast.",
          "button": "Bezorging bestellen"
        },
        {
          "icon": "💧",
          "name": "Abonnement",
          "desc": "Water, maar voor altijd. Als een huisdier dat nooit doodgaat.",
          "button": "Abonneren"
        },
        {
          "icon": "🥤",
          "name": "Eigen fles",
          "desc": "De goedkoopste optie, en de planeet zegt dank je.",
          "button": "Vind een kraan"
        }
      ]
    },
    "features": {
      "title": "Dingen die je niet wist dat water kon",
      "items": [
        {
          "icon": "💧",
          "title": "100% nat",
          "desc": "elke druppel, gegarandeerd"
        },
        {
          "icon": "❄️",
          "title": "Werkt met ijs",
          "desc": "voeg kou toe, word kouder"
        },
        {
          "icon": "☁️",
          "title": "Uit de wolken",
          "desc": "letterlijk uit de lucht gevallen"
        },
        {
          "icon": "🔁",
          "title": "Eindeloos bij te vullen",
          "desc": "op? Doe er meer bij"
        },
        {
          "icon": "🚫",
          "title": "Suikervrij, glutenvrij, overal vrij van",
          "desc": ""
        },
        {
          "icon": "🌍",
          "title": "Aanbevolen door 71% van het aardoppervlak",
          "desc": ""
        }
      ]
    },
    "surviveEyebrow": "Overlevingsgids",
    "guideHome": {
      "title": "Je woning koelen zonder airco (zonder een nier te verkopen)",
      "steps": [
        "Sluit overdag gordijnen/jaloezieën — glas geeft de meeste warmte; voorrang aan zuid en west.",
        "’s Nachts en bij zonsopgang — tocht (ramen aan weerszijden).",
        "Een nat laken voor een open raam/ventilator — verdampingskoeling.",
        "Ventilator + een kom ijs = armemensenairco.",
        "Zet alles uit wat warmte geeft: oven, fornuis, gloeilampen.",
        "Warme lucht stijgt — slaap laag."
      ]
    },
    "guideBody": {
      "title": "Hoe je niet smelt: een gids voor mensen",
      "steps": [
        "Drink vóór je dorst hebt; alcohol en koffie drogen je uit.",
        "Bij flink zweten → elektrolyten (zout, kalium, magnesium).",
        "Vermijd de zon van 11:00 tot 17:00.",
        "Koel je polsslagpunten: polsen, nek.",
        "Koele — niet ijskoude — douche; lichte, losse kleding.",
        "⚠️ Hitteberoerte (hete droge huid, verwardheid, misselijkheid) — bel 112."
      ]
    },
    "pricing": {
      "eyebrow": "Prijzen",
      "title": "Eenvoudig, transparant, vooral water",
      "popularBadge": "Meest gekozen",
      "footnote": "Het water is in elk abonnement identiek. Dit is de eerlijkste prijspagina van het internet.",
      "tiers": [
        {
          "name": "Free",
          "price": "€0",
          "desc": "Kraanwater. Natheid inbegrepen. Geen fles, geen respect van gasten.",
          "button": "Gratis starten",
          "popular": false
        },
        {
          "name": "Pro",
          "price": "€9",
          "desc": "Zelfde water, mooiere fles. Nu lijk je iemand die zijn leven op orde heeft.",
          "button": "Kies Pro",
          "popular": true
        },
        {
          "name": "Family",
          "price": "€29",
          "desc": "Genoeg voor iedereen, ook de familie die alleen langskomt als het warm is.",
          "button": "Kies Family",
          "popular": false
        },
        {
          "name": "Enterprise",
          "price": "Neem contact op",
          "desc": "Een zwembad. Airco. Een regendans. Verhuizing naar Noorwegen.",
          "button": "Verkoop contacteren",
          "popular": false
        }
      ]
    },
    "testimonials": {
      "title": "Geliefd bij gehydrateerde mensen",
      "items": [
        {
          "quote": "Ik dronk Wet Water en het was inderdaad nat. Precies zoals beloofd — zeldzaam tegenwoordig.",
          "author": "Sergei, beroepsscepticus"
        },
        {
          "quote": "Overgestapt van het droge water van een concurrent. Nooit meer terug.",
          "author": "Anna, hydratie-enthousiast"
        },
        {
          "quote": "Vijf sterren. Het is water.",
          "author": "een glas water (geverifieerde aankoop)"
        },
        {
          "quote": "Ik ben een kamerplant en dit heeft alles veranderd. Vooral omdat ze me eindelijk water gaven.",
          "author": "Boris, een varen"
        },
        {
          "quote": "10/10, zou opnieuw vloeibaar willen zijn.",
          "author": "de oceaan"
        }
      ]
    },
    "faq": {
      "title": "FAQ",
      "items": [
        {
          "q": "Is het water echt nat?",
          "a": "Ja. Dat is ons hele businessmodel."
        },
        {
          "q": "Hoe verschilt het van gewoon water?",
          "a": "Niet. Wij zijn net zo verbaasd als jij."
        },
        {
          "q": "Waarom betalen als kraanwater gratis is?",
          "a": "De fles. En het gevoel dat je een keuze hebt gemaakt."
        },
        {
          "q": "…wacht, is de naam een—?",
          "a": "Het is water. Haal je hoofd uit de goot."
        },
        {
          "q": "Hoeveel moet ik drinken in de hitte?",
          "a": "~2–3 liter/dag, meer bij inspanning en zweten; lichte urine = goed."
        },
        {
          "q": "Waar koop ik het eigenlijk?",
          "a": "Bij onze partners hierboven. Dat is letterlijk de bedoeling."
        }
      ]
    },
    "footer": {
      "statement": "Officiële verklaring: op 24 juni ging de zon te ver. We hebben een klacht ingediend. Sluit ondertussen je gordijnen.",
      "legal": "Wet Water™ — water zoals de natuur het bedoelde, nu met een landingspagina. Natheid niet gegarandeerd onder 0°C. De grappen zijn grappen; het hitte-advies niet.",
      "backToTop": "↑ kom boven voor lucht",
      "newsletter": "Natheidsupdates. Max één druppel per week.",
      "newsletterThanks": "💧 Eén druppel onderweg.",
      "subscribe": "Aanmelden",
      "placeholder": "jij@nat.nl"
    },
    "cookie": {
      "text": "We gebruiken cookies. En water. Vooral water.",
      "accept": "Accepteren",
      "dismiss": "Ga iets drinken"
    }
  }
};
