const projectsData = [
    {
        imgSrc: "/pp_Card1.png",
        title: {
            ru: "Открытый бюджет",
            kz: "Ашық бюджет",
            en: "Open Budget"
        },
        description: {
            ru: "Визуализация и анализ бюджетных данных для повышения прозрачности государственных расходов",
            kz: "Мемлекеттік шығындардың ашықтығын арттыру үшін бюджеттік деректерді визуализациялау және талдау",
            en: "Visualization and analysis of budget data to enhance government spending transparency"
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        tag: {
            ru: "Финансы",
            kz: "Қаржы",
            en: "Finance"
        },
        tagKey: "finance",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card2.png",
        title: {
            ru: "Эко Мониторинг",
            kz: "Эко мониторинг",
            en: "Eco Monitoring"
        },
        description: {
            ru: "Система мониторинга экологической ситуации в режиме реального времени",
            kz: "Экологиялық жағдайды нақты уақытта бақылау жүйесі",
            en: "Real-time environmental monitoring system"
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        tag: {
            ru: "Экология",
            kz: "Экология",
            en: "Ecology"
        },
        tagKey: "ecology",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card3.png",
        title: {
            ru: "Умный транспорт",
            kz: "Ақылды көлік",
            en: "Smart Transport"
        },
        description: {
            ru: "Интерактивная карта общественного транспорта с расписанием и маршрутами",
            kz: "Қоғамдық көліктің кестесі мен маршруттары бар интерактивті карта",
            en: "Interactive public transport map with schedules and routes"
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        tag: {
            ru: "Транспорт",
            kz: "Көлік",
            en: "Transport"
        },
        tagKey: "transport",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card4.png",
        title: {
            ru: "Здоровье населения",
            kz: "Халық денсаулығы",
            en: "Public Health"
        },
        description: {
            ru: "Статистика и аналитика в сфере здравоохранения для принятия решений",
            kz: "Шешім қабылдау үшін денсаулық сақтау саласындағы статистика мен аналитика",
            en: "Healthcare statistics and analytics for decision-making"
        },
        date: {
            ru: "12 февраля 2025",
            kz: "2025 жылғы 12 ақпан",
            en: "February 12, 2025"
        },
        tag: {
            ru: "Здравоохранение",
            kz: "Денсаулық сақтау",
            en: "Healthcare"
        },
        tagKey: "healthcare",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card5.png",
        title: {
            ru: "Образовательный портал",
            kz: "Білім порталы",
            en: "Educational Portal"
        },
        description: {
            ru: "Единая платформа для доступа к образовательным ресурсам и сервисам",
            kz: "Білім беру ресурстары мен қызметтеріне қол жеткізуге арналған бірыңғай платформа",
            en: "A unified platform for accessing educational resources and services"
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card6.png",
        title: {
            ru: "Городские инициативы",
            kz: "Қалалық бастамалар",
            en: "Urban Initiatives"
        },
        description: {
            ru: "Платформа для обсуждения и реализации городских проектов",
            kz: "Қалалық жобаларды талқылау және жүзеге асыру платформасы",
            en: "A platform for discussing and implementing urban projects"
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        tag: {
            ru: "Урбанистика",
            kz: "Урбанистика",
            en: "Urbanism"
        },
        tagKey: "urbanism",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card6.png",
        title: {
            ru: "Городские инициативы",
            kz: "Қалалық бастамалар",
            en: "Urban Initiatives"
        },
        description: {
            ru: "Платформа для обсуждения и реализации городских проектов",
            kz: "Қалалық жобаларды талқылау және жүзеге асыру платформасы",
            en: "A platform for discussing and implementing urban projects"
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        tag: {
            ru: "Урбанистика",
            kz: "Урбанистика",
            en: "Urbanism"
        },
        tagKey: "urbanism",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card6.png",
        title: {
            ru: "Городские инициативы",
            kz: "Қалалық бастамалар",
            en: "Urban Initiatives"
        },
        description: {
            ru: "Платформа для обсуждения и реализации городских проектов",
            kz: "Қалалық жобаларды талқылау және жүзеге асыру платформасы",
            en: "A platform for discussing and implementing urban projects"
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        tag: {
            ru: "Урбанистика",
            kz: "Урбанистика",
            en: "Urbanism"
        },
        tagKey: "urbanism",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card6.png",
        title: {
            ru: "Городские инициативы",
            kz: "Қалалық бастамалар",
            en: "Urban Initiatives"
        },
        description: {
            ru: "Платформа для обсуждения и реализации городских проектов",
            kz: "Қалалық жобаларды талқылау және жүзеге асыру платформасы",
            en: "A platform for discussing and implementing urban projects"
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        tag: {
            ru: "Урбанистика",
            kz: "Урбанистика",
            en: "Urbanism"
        },
        tagKey: "urbanism",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card6.png",
        title: {
            ru: "Городские инициативы",
            kz: "Қалалық бастамалар",
            en: "Urban Initiatives"
        },
        description: {
            ru: "Платформа для обсуждения и реализации городских проектов",
            kz: "Қалалық жобаларды талқылау және жүзеге асыру платформасы",
            en: "A platform for discussing and implementing urban projects"
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        tag: {
            ru: "Урбанистика",
            kz: "Урбанистика",
            en: "Urbanism"
        },
        tagKey: "urbanism",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card6.png",
        title: {
            ru: "Городские инициативы",
            kz: "Қалалық бастамалар",
            en: "Urban Initiatives"
        },
        description: {
            ru: "Платформа для обсуждения и реализации городских проектов",
            kz: "Қалалық жобаларды талқылау және жүзеге асыру платформасы",
            en: "A platform for discussing and implementing urban projects"
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        tag: {
            ru: "Урбанистика",
            kz: "Урбанистика",
            en: "Urbanism"
        },
        tagKey: "urbanism",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card6.png",
        title: {
            ru: "Городские инициативы",
            kz: "Қалалық бастамалар",
            en: "Urban Initiatives"
        },
        description: {
            ru: "Платформа для обсуждения и реализации городских проектов",
            kz: "Қалалық жобаларды талқылау және жүзеге асыру платформасы",
            en: "A platform for discussing and implementing urban projects"
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        tag: {
            ru: "Урбанистика",
            kz: "Урбанистика",
            en: "Urbanism"
        },
        tagKey: "urbanism",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card5.png",
        title: {
            ru: "Образовательный портал",
            kz: "Білім порталы",
            en: "Educational Portal"
        },
        description: {
            ru: "Единая платформа для доступа к образовательным ресурсам и сервисам",
            kz: "Білім беру ресурстары мен қызметтеріне қол жеткізуге арналған бірыңғай платформа",
            en: "A unified platform for accessing educational resources and services"
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card5.png",
        title: {
            ru: "Образовательный портал",
            kz: "Білім порталы",
            en: "Educational Portal"
        },
        description: {
            ru: "Единая платформа для доступа к образовательным ресурсам и сервисам",
            kz: "Білім беру ресурстары мен қызметтеріне қол жеткізуге арналған бірыңғай платформа",
            en: "A unified platform for accessing educational resources and services"
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card5.png",
        title: {
            ru: "Образовательный портал",
            kz: "Білім порталы",
            en: "Educational Portal"
        },
        description: {
            ru: "Единая платформа для доступа к образовательным ресурсам и сервисам",
            kz: "Білім беру ресурстары мен қызметтеріне қол жеткізуге арналған бірыңғай платформа",
            en: "A unified platform for accessing educational resources and services"
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card5.png",
        title: {
            ru: "Образовательный портал",
            kz: "Білім порталы",
            en: "Educational Portal"
        },
        description: {
            ru: "Единая платформа для доступа к образовательным ресурсам и сервисам",
            kz: "Білім беру ресурстары мен қызметтеріне қол жеткізуге арналған бірыңғай платформа",
            en: "A unified platform for accessing educational resources and services"
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card5.png",
        title: {
            ru: "Образовательный портал",
            kz: "Білім порталы",
            en: "Educational Portal"
        },
        description: {
            ru: "Единая платформа для доступа к образовательным ресурсам и сервисам",
            kz: "Білім беру ресурстары мен қызметтеріне қол жеткізуге арналған бірыңғай платформа",
            en: "A unified platform for accessing educational resources and services"
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/projectDetail"
    },
    {
        imgSrc: "/pp_Card5.png",
        title: {
            ru: "Образовательный портал",
            kz: "Білім порталы",
            en: "Educational Portal"
        },
        description: {
            ru: "Единая платформа для доступа к образовательным ресурсам и сервисам",
            kz: "Білім беру ресурстары мен қызметтеріне қол жеткізуге арналған бірыңғай платформа",
            en: "A unified platform for accessing educational resources and services"
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/projectDetail"
    },
];

export default projectsData;