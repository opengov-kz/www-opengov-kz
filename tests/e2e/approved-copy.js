// Approved H1 + SEO per MVP route and locale, copied by hand from the Notion SSOT (not read from the app's
// locale JSON, so a drift in either place fails AC-IMP-03). "OpenGov.kz" is plain text, never a Notion auto-link.
// Sources: / /community /about — RU master 06.11.2026 + ED-03 SEO, KK/EN masters (Q-OGK-ED-05-05=A);
// /open-government — RU/KK/EN Approved 03.11.2026 incl. embedded SEO (Q-OGK-CKM-12-SEO-01=A);
// /tools* — ED-TOOLS-05 RU, ED-TOOLS KK/EN and ED-TOOLS SEO (Approved 05.11.2026).
export const APPROVED = {
  '/': {
    ru: {
      h1: 'Открытое правительство в Казахстане',
      title: 'Открытое правительство в Казахстане — OpenGov.kz',
      description: 'Независимая гражданская инициатива OpenGov.kz об открытом правительстве в Казахстане: открытые данные, государственные бюджеты и участие граждан.',
    },
    kz: {
      h1: 'Қазақстандағы ашық үкімет',
      title: 'Қазақстандағы ашық үкімет — OpenGov.kz',
      description: 'OpenGov.kz — тәуелсіз азаматтық бастама. Қазақстандағы ашық үкімет: ашық деректер, мемлекеттік бюджеттер және азаматтардың қатысуы.',
    },
    en: {
      h1: 'Open Government in Kazakhstan',
      title: 'Open Government in Kazakhstan — OpenGov.kz',
      description: 'OpenGov.kz is an independent civic initiative about open government in Kazakhstan: open data, public budgets and civic participation.',
    },
  },
  '/open-government': {
    ru: {
      h1: 'Что такое открытое правительство?',
      title: 'Что такое открытое правительство в Казахстане — OpenGov.kz',
      description: 'Прозрачность, участие граждан и подотчётность: как работает открытое правительство, кому оно полезно и какие инструменты существуют в Казахстане.',
    },
    kz: {
      h1: 'Ашық үкімет дегеніміз не?',
      title: 'Қазақстандағы ашық үкімет дегеніміз не — OpenGov.kz',
      description: 'Ашықтық, азаматтардың қатысуы және есеп берушілік: ашық үкімет қалай жұмыс істейді, оның пайдасы және Қазақстандағы құралдар.',
    },
    en: {
      h1: 'What is open government?',
      title: 'What Is Open Government in Kazakhstan? — OpenGov.kz',
      description: 'Transparency, public participation and accountability: how open government works, why it matters and which tools exist in Kazakhstan.',
    },
  },
  '/tools': {
    ru: {
      h1: 'Инструменты открытого правительства в Казахстане',
      title: 'Инструменты открытого правительства в Казахстане — OpenGov.kz',
      description: 'Открытые данные, бюджеты и проекты НПА: три государственных портала Казахстана, их назначение и ссылки на официальные ресурсы.',
    },
    kz: {
      h1: 'Қазақстандағы ашық үкімет құралдары',
      title: 'Қазақстандағы ашық үкімет құралдары — OpenGov.kz',
      description: 'Ашық деректер, бюджеттер және НҚА жобалары: Қазақстандағы үш мемлекеттік порталдың мақсаты мен ресми сілтемелері.',
    },
    en: {
      h1: 'Open Government Tools in Kazakhstan',
      title: 'Open Government Tools in Kazakhstan — OpenGov.kz',
      description: 'Explore Kazakhstan’s open data, budget and draft legal act portals, with practical introductions and links to official resources.',
    },
  },
  '/tools/open-data': {
    ru: {
      h1: 'Портал открытых данных',
      title: 'Портал открытых данных Казахстана — OpenGov.kz',
      description: 'Что такое data.egov.kz, как искать наборы данных, проверять источники и даты обновления и пользоваться разделом для разработчиков.',
    },
    kz: {
      h1: 'Ашық деректер порталы',
      title: 'Қазақстанның ашық деректер порталы — OpenGov.kz',
      description: 'data.egov.kz порталынан деректер жиынтықтарын іздеу, олардың дереккөздері мен жаңартылуын тексеру және әзірлеушілер бөлімі туралы.',
    },
    en: {
      h1: 'Open Data Portal',
      title: 'Kazakhstan Open Data Portal — OpenGov.kz',
      description: 'Learn how to find datasets on data.egov.kz, check their sources and update dates, and explore resources for developers.',
    },
  },
  '/tools/open-budgets': {
    ru: {
      h1: 'Портал открытых бюджетов',
      title: 'Портал открытых бюджетов Казахстана — OpenGov.kz',
      description: 'Бюджетные заявки, программы, доходы, расходы и отчёты: как знакомиться с информацией на budget.egov.kz.',
    },
    kz: {
      h1: 'Ашық бюджеттер порталы',
      title: 'Қазақстанның ашық бюджеттер порталы — OpenGov.kz',
      description: 'budget.egov.kz порталындағы бюджеттік өтінімдер, бағдарламалар, кірістер, шығыстар мен есептер туралы ақпарат.',
    },
    en: {
      h1: 'Open Budgets Portal',
      title: 'Kazakhstan Open Budgets Portal — OpenGov.kz',
      description: 'Explore budget requests, programmes, revenue, expenditure and budget execution reports on Kazakhstan’s Open Budgets portal.',
    },
  },
  '/tools/legal-acts': {
    ru: {
      h1: 'Портал открытых нормативных правовых актов',
      title: 'Портал открытых НПА Казахстана — OpenGov.kz',
      description: 'Как искать проекты нормативных правовых актов, проверять сроки обсуждения и знакомиться с текстами на legalacts.egov.kz.',
    },
    kz: {
      h1: 'Ашық нормативтік құқықтық актілер порталы',
      title: 'Қазақстанның ашық НҚА порталы — OpenGov.kz',
      description: 'legalacts.egov.kz порталынан НҚА жобаларын іздеу, талқылау мерзімдерін тексеру және құжаттармен танысу жолдары.',
    },
    en: {
      h1: 'Open Regulatory Legal Acts Portal',
      title: 'Kazakhstan Open Legal Acts Portal — OpenGov.kz',
      description: 'Find draft legal acts on legalacts.egov.kz, review consultation deadlines and documents, and learn about submitting comments.',
    },
  },
  '/community': {
    ru: {
      h1: 'Обсудим, как сделать государство открытее',
      title: 'Сообщество и участие — OpenGov.kz',
      description: 'Предложите тему для анализа и узнайте о сотрудничестве по открытым данным, законодательству и открытому правительству в Казахстане. Сообщество формируется.',
    },
    kz: {
      h1: 'Мемлекетті қалай ашығырақ етуге болатынын талқылайық',
      title: 'Қауымдастық және қатысу — OpenGov.kz',
      description: 'Қазақстандағы ашық деректер, заңнама және ашық үкімет бойынша тақырып ұсыныңыз, ынтымақтастық мүмкіндіктерімен танысыңыз. Қауымдастық қалыптасу кезеңінде.',
    },
    en: {
      h1: "Let's discuss how to make government more open",
      title: 'Community and Participation — OpenGov.kz',
      description: 'Suggest a topic and explore ways to collaborate on open data, legislation and open government in Kazakhstan. The community is being formed.',
    },
  },
  '/about': {
    ru: {
      h1: 'Чтобы людям было проще участвовать в делах государства',
      title: 'О проекте OpenGov.kz — независимая гражданская инициатива',
      description: 'Узнайте, зачем развивается OpenGov.kz, что инициатива делает сейчас и какие направления исследований, сотрудничества и сервисов планирует развивать.',
    },
    kz: {
      h1: 'Адамдардың мемлекет ісіне қатысуын жеңілдету үшін',
      title: 'OpenGov.kz туралы — тәуелсіз азаматтық бастама',
      description: 'OpenGov.kz бастамасының мақсаты, қазіргі жұмысы және ашық үкімет, зерттеулер мен ынтымақтастық бойынша болашақ жоспарлары туралы біліңіз.',
    },
    en: {
      h1: 'Making it easier for people to participate in public affairs',
      title: 'About OpenGov.kz — Independent Civic Initiative',
      description: 'Learn why OpenGov.kz exists, what the initiative is working on now and its plans for research, collaboration and public-interest services.',
    },
  },
};

// Approved independence disclaimer (/open-government §8), shown in the footer of every page.
export const DISCLAIMER = {
  ru: 'OpenGov.kz — независимая гражданская инициатива. Этот сайт не является официальным государственным ресурсом.',
  kz: 'OpenGov.kz — тәуелсіз азаматтық бастама. Бұл сайт ресми мемлекеттік ресурс емес.',
  en: 'OpenGov.kz is an independent civic initiative. This website is not an official government resource.',
};
