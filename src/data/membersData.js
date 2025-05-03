const membersData = [
    {
        imgSrc: "/membersp_Card1.png",
        name: {
            ru: "Ермек Диас",
            kz: "Ермек Диас",
            en: "Yermek Dias"
        },
        profession: {
            ru: "Разработчик",
            kz: "Әзірлеуші",
            en: "Developer"
        },
        description: {
            ru: "Специалист по работе с открытыми данными и API. Участвует в проектах по цифровизации государственных услуг.",
            kz: "Ашық деректер мен API-мен жұмыс істеу маманы. Мемлекеттік қызметтерді цифрландыру жобаларына қатысады.",
            en: "Expert in working with open data and APIs. Participates in government digitalization projects."
        },
        tag: {
            ru: "Разработчики",
            kz: "Әзірлеушілер",
            en: "Developers"
        },
        tagKey: "frontend",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Айгерим Турсунова",
            kz: "Айгерім Тұрсынова",
            en: "Aigerim Tursunova"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Эксперт по анализу данных и статистическим методам в сфере открытых данных.",
            kz: "Ашық деректер саласындағы деректерді талдау және статистикалық әдістер бойынша сарапшы.",
            en: "Expert in data analysis and statistical methods in the field of open data."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Сергей Иванов",
            kz: "Сергей Иванов",
            en: "Sergey Ivanov"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Занимается исследованием и оценкой проектов по открытым данным в различных областях.",
            kz: "Әртүрлі салалардағы ашық деректер жобаларын зерттеу және бағалаумен айналысады.",
            en: "Engages in research and evaluation of open data projects across various domains."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card4.png",
        name: {
            ru: "Динара Султанова",
            kz: "Динара Сұлтанова",
            en: "Dinara Sultanova"
        },
        profession: {
            ru: "Разработчик",
            kz: "Әзірлеуші",
            en: "Developer"
        },
        description: {
            ru: "Разработчик программного обеспечения, работающий с публичными API и сервисами для открытых данных.",
            kz: "Ашық деректерге арналған API мен сервистермен жұмыс істейтін бағдарламалық жасақтама әзірлеуші.",
            en: "Software developer working with public APIs and open data services."
        },
        tag: {
            ru: "Разработчики",
            kz: "Әзірлеушілер",
            en: "Developers"
        },
        tagKey: "frontend",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Марат Нурбаев",
            kz: "Марат Нұрбаев",
            en: "Marat Nurbayev"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Аналитик, занимающийся обработкой и анализом открытых данных для государственного сектора.",
            kz: "Мемлекеттік секторға арналған ашық деректерді өңдеу және талдаумен айналысатын талдаушы.",
            en: "Analyst focused on processing and analyzing open data for the public sector."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Ирина Соловьева",
            kz: "Ирина Соловьева",
            en: "Irina Solovyova"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Проводит исследования в области использования открытых данных в социальных проектах.",
            kz: "Әлеуметтік жобаларда ашық деректерді пайдалану бойынша зерттеулер жүргізеді.",
            en: "Conducts research on the use of open data in social projects."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Ирина Соловьева",
            kz: "Ирина Соловьева",
            en: "Irina Solovyova"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Проводит исследования в области использования открытых данных в социальных проектах.",
            kz: "Әлеуметтік жобаларда ашық деректерді пайдалану бойынша зерттеулер жүргізеді.",
            en: "Conducts research on the use of open data in social projects."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Ирина Соловьева",
            kz: "Ирина Соловьева",
            en: "Irina Solovyova"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Проводит исследования в области использования открытых данных в социальных проектах.",
            kz: "Әлеуметтік жобаларда ашық деректерді пайдалану бойынша зерттеулер жүргізеді.",
            en: "Conducts research on the use of open data in social projects."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Ирина Соловьева",
            kz: "Ирина Соловьева",
            en: "Irina Solovyova"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Проводит исследования в области использования открытых данных в социальных проектах.",
            kz: "Әлеуметтік жобаларда ашық деректерді пайдалану бойынша зерттеулер жүргізеді.",
            en: "Conducts research on the use of open data in social projects."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Ирина Соловьева",
            kz: "Ирина Соловьева",
            en: "Irina Solovyova"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Проводит исследования в области использования открытых данных в социальных проектах.",
            kz: "Әлеуметтік жобаларда ашық деректерді пайдалану бойынша зерттеулер жүргізеді.",
            en: "Conducts research on the use of open data in social projects."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Ирина Соловьева",
            kz: "Ирина Соловьева",
            en: "Irina Solovyova"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Проводит исследования в области использования открытых данных в социальных проектах.",
            kz: "Әлеуметтік жобаларда ашық деректерді пайдалану бойынша зерттеулер жүргізеді.",
            en: "Conducts research on the use of open data in social projects."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card3.png",
        name: {
            ru: "Ирина Соловьева",
            kz: "Ирина Соловьева",
            en: "Irina Solovyova"
        },
        profession: {
            ru: "Исследователь",
            kz: "Зерттеуші",
            en: "Researcher"
        },
        description: {
            ru: "Проводит исследования в области использования открытых данных в социальных проектах.",
            kz: "Әлеуметтік жобаларда ашық деректерді пайдалану бойынша зерттеулер жүргізеді.",
            en: "Conducts research on the use of open data in social projects."
        },
        tag: {
            ru: "Исследователи",
            kz: "Зерттеушілер",
            en: "Researchers"
        },
        tagKey: "research",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Марат Нурбаев",
            kz: "Марат Нұрбаев",
            en: "Marat Nurbayev"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Аналитик, занимающийся обработкой и анализом открытых данных для государственного сектора.",
            kz: "Мемлекеттік секторға арналған ашық деректерді өңдеу және талдаумен айналысатын талдаушы.",
            en: "Analyst focused on processing and analyzing open data for the public sector."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Марат Нурбаев",
            kz: "Марат Нұрбаев",
            en: "Marat Nurbayev"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Аналитик, занимающийся обработкой и анализом открытых данных для государственного сектора.",
            kz: "Мемлекеттік секторға арналған ашық деректерді өңдеу және талдаумен айналысатын талдаушы.",
            en: "Analyst focused on processing and analyzing open data for the public sector."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Марат Нурбаев",
            kz: "Марат Нұрбаев",
            en: "Marat Nurbayev"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Аналитик, занимающийся обработкой и анализом открытых данных для государственного сектора.",
            kz: "Мемлекеттік секторға арналған ашық деректерді өңдеу және талдаумен айналысатын талдаушы.",
            en: "Analyst focused on processing and analyzing open data for the public sector."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Марат Нурбаев",
            kz: "Марат Нұрбаев",
            en: "Marat Nurbayev"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Аналитик, занимающийся обработкой и анализом открытых данных для государственного сектора.",
            kz: "Мемлекеттік секторға арналған ашық деректерді өңдеу және талдаумен айналысатын талдаушы.",
            en: "Analyst focused on processing and analyzing open data for the public sector."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Марат Нурбаев",
            kz: "Марат Нұрбаев",
            en: "Marat Nurbayev"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Аналитик, занимающийся обработкой и анализом открытых данных для государственного сектора.",
            kz: "Мемлекеттік секторға арналған ашық деректерді өңдеу және талдаумен айналысатын талдаушы.",
            en: "Analyst focused on processing and analyzing open data for the public sector."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    {
        imgSrc: "/membersp_Card2.png",
        name: {
            ru: "Марат Нурбаев",
            kz: "Марат Нұрбаев",
            en: "Marat Nurbayev"
        },
        profession: {
            ru: "Аналитик",
            kz: "Талдаушы",
            en: "Analyst"
        },
        description: {
            ru: "Аналитик, занимающийся обработкой и анализом открытых данных для государственного сектора.",
            kz: "Мемлекеттік секторға арналған ашық деректерді өңдеу және талдаумен айналысатын талдаушы.",
            en: "Analyst focused on processing and analyzing open data for the public sector."
        },
        tag: {
            ru: "Аналитики",
            kz: "Талдаушылар",
            en: "Analysts"
        },
        tagKey: "data",
        link: "/membersDetail"
    },
    // Добавьте других участников
];

export default membersData;
