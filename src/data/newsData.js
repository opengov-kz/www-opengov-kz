// src/data/newsData.js
const newsData = [
    {
        imgSrc: "/np_Card1.png",
        title: {
            ru: "Новая платформа электронного правительства запущена в тестовом режиме",
            kz: "Электрондық үкіметтің жаңа платформасы сынақ режимінде іске қосылды",
            en: "New e-Government platform launched in test mode"
        },
        description: {
            ru: "Инновационная платформа предоставит гражданам улучшенный доступ к государственным услугам...",
            kz: "Инновациялық платформа азаматтарға мемлекеттік қызметтерге қолжетімділікті жақсартады...",
            en: "The innovative platform will provide citizens with improved access to public services..."
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        author: {
            ru: "Анна Петрова",
            kz: "Анна Петрова",
            en: "Anna Petrova"
        },
        tag: {
            ru: "Технологии",
            kz: "Технологиялар",
            en: "Technology"
        },
        tagKey: "technology",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card2.png",
        title: {
            ru: "Парламент рассмотрит новый законопроект о цифровой идентификации",
            kz: "Парламент цифрлық сәйкестендіру туралы жаңа заң жобасын қарастырады",
            en: "Parliament to review new digital ID legislation"
        },
        description: {
            ru: "Законопроект направлен на усиление безопасности персональных данных граждан...",
            kz: "Заң жобасы азаматтардың дербес деректерінің қауіпсіздігін күшейтуге бағытталған...",
            en: "The bill aims to strengthen the security of citizens' personal data..."
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        author: {
            ru: "Максим Иванов",
            kz: "Максим Иванов",
            en: "Maxim Ivanov"
        },
        tag: {
            ru: "Закон",
            kz: "Заң",
            en: "Law"
        },
        tagKey: "law",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card3.png",
        title: {
            ru: "Запуск образовательной программы по цифровой грамотности",
            kz: "Цифрлық сауаттылық бойынша білім беру бағдарламасының іске қосылуы",
            en: "Launch of digital literacy education program"
        },
        description: {
            ru: "Министерство образования объявило о начале масштабной программы обучения...",
            kz: "Білім министрлігі ауқымды оқыту бағдарламасының басталғанын хабарлады...",
            en: "The Ministry of Education has announced the launch of a large-scale training program..."
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        author: {
            ru: "Елена Смирнова",
            kz: "Елена Смирнова",
            en: "Elena Smirnova"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card4.png",
        title: {
            ru: "Внедрение технологии блокчейн в государственном секторе",
            kz: "Мемлекеттік секторға блокчейн технологиясын енгізу",
            en: "Blockchain technology introduced in the public sector"
        },
        description: {
            ru: "Новая инициатива позволит повысить прозрачность государственных процессов...",
            kz: "Жаңа бастама мемлекеттік үдерістердің ашықтығын арттыруға мүмкіндік береді...",
            en: "The new initiative will improve the transparency of government processes..."
        },
        date: {
            ru: "12 февраля 2025",
            kz: "2025 жылғы 12 ақпан",
            en: "February 12, 2025"
        },
        author: {
            ru: "Сергей Козлов",
            kz: "Сергей Козлов",
            en: "Sergey Kozlov"
        },
        tag: {
            ru: "Блокчейн",
            kz: "Блокчейн",
            en: "Blockchain"
        },
        tagKey: "blockchain",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card5.png",
        title: {
            ru: "Результаты общественного обсуждения городского планирования",
            kz: "Қалалық жоспарлау бойынша қоғамдық талқылау нәтижелері",
            en: "Results of public discussion on urban planning"
        },
        description: {
            ru: "Подведены итоги масштабного опроса граждан о развитии городской инфраструктуры...",
            kz: "Қалалық инфрақұрылымды дамыту бойынша азаматтардың кең ауқымды сауалнамасының қорытындысы шығарылды...",
            en: "The results of a large-scale citizen survey on urban infrastructure development have been summed up..."
        },
        date: {
            ru: "11 февраля 2024",
            kz: "2024 жылғы 11 ақпан",
            en: "February 11, 2024"
        },
        author: {
            ru: "Мария Николаева",
            kz: "Мария Николаева",
            en: "Maria Nikolaeva"
        },
        tag: {
            ru: "Общество",
            kz: "Қоғам",
            en: "Society"
        },
        tagKey: "society",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card6.png",
        title: {
            ru: "Новые меры поддержки малого и среднего бизнеса",
            kz: "Шағын және орта бизнесті қолдаудың жаңа шаралары",
            en: "New support measures for small and medium businesses"
        },
        description: {
            ru: "Правительство утвердило комплекс мер по стимулированию предпринимательства...",
            kz: "Үкімет кәсіпкерлікті ынталандыру бойынша шаралар кешенін бекітті...",
            en: "The government approved a package of measures to stimulate entrepreneurship..."
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        author: {
            ru: "Дмитрий Соколов",
            kz: "Дмитрий Соколов",
            en: "Dmitry Sokolov"
        },
        tag: {
            ru: "Бизнес",
            kz: "Бизнес",
            en: "Business"
        },
        tagKey: "business",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card6.png",
        title: {
            ru: "Новые меры поддержки малого и среднего бизнеса",
            kz: "Шағын және орта бизнесті қолдаудың жаңа шаралары",
            en: "New support measures for small and medium businesses"
        },
        description: {
            ru: "Правительство утвердило комплекс мер по стимулированию предпринимательства...",
            kz: "Үкімет кәсіпкерлікті ынталандыру бойынша шаралар кешенін бекітті...",
            en: "The government approved a package of measures to stimulate entrepreneurship..."
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        author: {
            ru: "Дмитрий Соколов",
            kz: "Дмитрий Соколов",
            en: "Dmitry Sokolov"
        },
        tag: {
            ru: "Бизнес",
            kz: "Бизнес",
            en: "Business"
        },
        tagKey: "business",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card6.png",
        title: {
            ru: "Новые меры поддержки малого и среднего бизнеса",
            kz: "Шағын және орта бизнесті қолдаудың жаңа шаралары",
            en: "New support measures for small and medium businesses"
        },
        description: {
            ru: "Правительство утвердило комплекс мер по стимулированию предпринимательства...",
            kz: "Үкімет кәсіпкерлікті ынталандыру бойынша шаралар кешенін бекітті...",
            en: "The government approved a package of measures to stimulate entrepreneurship..."
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        author: {
            ru: "Дмитрий Соколов",
            kz: "Дмитрий Соколов",
            en: "Dmitry Sokolov"
        },
        tag: {
            ru: "Бизнес",
            kz: "Бизнес",
            en: "Business"
        },
        tagKey: "business",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card6.png",
        title: {
            ru: "Новые меры поддержки малого и среднего бизнеса",
            kz: "Шағын және орта бизнесті қолдаудың жаңа шаралары",
            en: "New support measures for small and medium businesses"
        },
        description: {
            ru: "Правительство утвердило комплекс мер по стимулированию предпринимательства...",
            kz: "Үкімет кәсіпкерлікті ынталандыру бойынша шаралар кешенін бекітті...",
            en: "The government approved a package of measures to stimulate entrepreneurship..."
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        author: {
            ru: "Дмитрий Соколов",
            kz: "Дмитрий Соколов",
            en: "Dmitry Sokolov"
        },
        tag: {
            ru: "Бизнес",
            kz: "Бизнес",
            en: "Business"
        },
        tagKey: "business",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card6.png",
        title: {
            ru: "Новые меры поддержки малого и среднего бизнеса",
            kz: "Шағын және орта бизнесті қолдаудың жаңа шаралары",
            en: "New support measures for small and medium businesses"
        },
        description: {
            ru: "Правительство утвердило комплекс мер по стимулированию предпринимательства...",
            kz: "Үкімет кәсіпкерлікті ынталандыру бойынша шаралар кешенін бекітті...",
            en: "The government approved a package of measures to stimulate entrepreneurship..."
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        author: {
            ru: "Дмитрий Соколов",
            kz: "Дмитрий Соколов",
            en: "Dmitry Sokolov"
        },
        tag: {
            ru: "Бизнес",
            kz: "Бизнес",
            en: "Business"
        },
        tagKey: "business",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card6.png",
        title: {
            ru: "Новые меры поддержки малого и среднего бизнеса",
            kz: "Шағын және орта бизнесті қолдаудың жаңа шаралары",
            en: "New support measures for small and medium businesses"
        },
        description: {
            ru: "Правительство утвердило комплекс мер по стимулированию предпринимательства...",
            kz: "Үкімет кәсіпкерлікті ынталандыру бойынша шаралар кешенін бекітті...",
            en: "The government approved a package of measures to stimulate entrepreneurship..."
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        author: {
            ru: "Дмитрий Соколов",
            kz: "Дмитрий Соколов",
            en: "Dmitry Sokolov"
        },
        tag: {
            ru: "Бизнес",
            kz: "Бизнес",
            en: "Business"
        },
        tagKey: "business",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card6.png",
        title: {
            ru: "Новые меры поддержки малого и среднего бизнеса",
            kz: "Шағын және орта бизнесті қолдаудың жаңа шаралары",
            en: "New support measures for small and medium businesses"
        },
        description: {
            ru: "Правительство утвердило комплекс мер по стимулированию предпринимательства...",
            kz: "Үкімет кәсіпкерлікті ынталандыру бойынша шаралар кешенін бекітті...",
            en: "The government approved a package of measures to stimulate entrepreneurship..."
        },
        date: {
            ru: "10 февраля 2024",
            kz: "2024 жылғы 10 ақпан",
            en: "February 10, 2024"
        },
        author: {
            ru: "Дмитрий Соколов",
            kz: "Дмитрий Соколов",
            en: "Dmitry Sokolov"
        },
        tag: {
            ru: "Бизнес",
            kz: "Бизнес",
            en: "Business"
        },
        tagKey: "business",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card3.png",
        title: {
            ru: "Запуск образовательной программы по цифровой грамотности",
            kz: "Цифрлық сауаттылық бойынша білім беру бағдарламасының іске қосылуы",
            en: "Launch of digital literacy education program"
        },
        description: {
            ru: "Министерство образования объявило о начале масштабной программы обучения...",
            kz: "Білім министрлігі ауқымды оқыту бағдарламасының басталғанын хабарлады...",
            en: "The Ministry of Education has announced the launch of a large-scale training program..."
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        author: {
            ru: "Елена Смирнова",
            kz: "Елена Смирнова",
            en: "Elena Smirnova"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card3.png",
        title: {
            ru: "Запуск образовательной программы по цифровой грамотности",
            kz: "Цифрлық сауаттылық бойынша білім беру бағдарламасының іске қосылуы",
            en: "Launch of digital literacy education program"
        },
        description: {
            ru: "Министерство образования объявило о начале масштабной программы обучения...",
            kz: "Білім министрлігі ауқымды оқыту бағдарламасының басталғанын хабарлады...",
            en: "The Ministry of Education has announced the launch of a large-scale training program..."
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        author: {
            ru: "Елена Смирнова",
            kz: "Елена Смирнова",
            en: "Elena Smirnova"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card3.png",
        title: {
            ru: "Запуск образовательной программы по цифровой грамотности",
            kz: "Цифрлық сауаттылық бойынша білім беру бағдарламасының іске қосылуы",
            en: "Launch of digital literacy education program"
        },
        description: {
            ru: "Министерство образования объявило о начале масштабной программы обучения...",
            kz: "Білім министрлігі ауқымды оқыту бағдарламасының басталғанын хабарлады...",
            en: "The Ministry of Education has announced the launch of a large-scale training program..."
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        author: {
            ru: "Елена Смирнова",
            kz: "Елена Смирнова",
            en: "Elena Smirnova"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card3.png",
        title: {
            ru: "Запуск образовательной программы по цифровой грамотности",
            kz: "Цифрлық сауаттылық бойынша білім беру бағдарламасының іске қосылуы",
            en: "Launch of digital literacy education program"
        },
        description: {
            ru: "Министерство образования объявило о начале масштабной программы обучения...",
            kz: "Білім министрлігі ауқымды оқыту бағдарламасының басталғанын хабарлады...",
            en: "The Ministry of Education has announced the launch of a large-scale training program..."
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        author: {
            ru: "Елена Смирнова",
            kz: "Елена Смирнова",
            en: "Elena Smirnova"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card3.png",
        title: {
            ru: "Запуск образовательной программы по цифровой грамотности",
            kz: "Цифрлық сауаттылық бойынша білім беру бағдарламасының іске қосылуы",
            en: "Launch of digital literacy education program"
        },
        description: {
            ru: "Министерство образования объявило о начале масштабной программы обучения...",
            kz: "Білім министрлігі ауқымды оқыту бағдарламасының басталғанын хабарлады...",
            en: "The Ministry of Education has announced the launch of a large-scale training program..."
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        author: {
            ru: "Елена Смирнова",
            kz: "Елена Смирнова",
            en: "Elena Smirnova"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card3.png",
        title: {
            ru: "Запуск образовательной программы по цифровой грамотности",
            kz: "Цифрлық сауаттылық бойынша білім беру бағдарламасының іске қосылуы",
            en: "Launch of digital literacy education program"
        },
        description: {
            ru: "Министерство образования объявило о начале масштабной программы обучения...",
            kz: "Білім министрлігі ауқымды оқыту бағдарламасының басталғанын хабарлады...",
            en: "The Ministry of Education has announced the launch of a large-scale training program..."
        },
        date: {
            ru: "13 февраля 2025",
            kz: "2025 жылғы 13 ақпан",
            en: "February 13, 2025"
        },
        author: {
            ru: "Елена Смирнова",
            kz: "Елена Смирнова",
            en: "Elena Smirnova"
        },
        tag: {
            ru: "Образование",
            kz: "Білім",
            en: "Education"
        },
        tagKey: "education",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card2.png",
        title: {
            ru: "Парламент рассмотрит новый законопроект о цифровой идентификации",
            kz: "Парламент цифрлық сәйкестендіру туралы жаңа заң жобасын қарастырады",
            en: "Parliament to review new digital ID legislation"
        },
        description: {
            ru: "Законопроект направлен на усиление безопасности персональных данных граждан...",
            kz: "Заң жобасы азаматтардың дербес деректерінің қауіпсіздігін күшейтуге бағытталған...",
            en: "The bill aims to strengthen the security of citizens' personal data..."
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        author: {
            ru: "Максим Иванов",
            kz: "Максим Иванов",
            en: "Maxim Ivanov"
        },
        tag: {
            ru: "Закон",
            kz: "Заң",
            en: "Law"
        },
        tagKey: "law",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card2.png",
        title: {
            ru: "Парламент рассмотрит новый законопроект о цифровой идентификации",
            kz: "Парламент цифрлық сәйкестендіру туралы жаңа заң жобасын қарастырады",
            en: "Parliament to review new digital ID legislation"
        },
        description: {
            ru: "Законопроект направлен на усиление безопасности персональных данных граждан...",
            kz: "Заң жобасы азаматтардың дербес деректерінің қауіпсіздігін күшейтуге бағытталған...",
            en: "The bill aims to strengthen the security of citizens' personal data..."
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        author: {
            ru: "Максим Иванов",
            kz: "Максим Иванов",
            en: "Maxim Ivanov"
        },
        tag: {
            ru: "Закон",
            kz: "Заң",
            en: "Law"
        },
        tagKey: "law",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card2.png",
        title: {
            ru: "Парламент рассмотрит новый законопроект о цифровой идентификации",
            kz: "Парламент цифрлық сәйкестендіру туралы жаңа заң жобасын қарастырады",
            en: "Parliament to review new digital ID legislation"
        },
        description: {
            ru: "Законопроект направлен на усиление безопасности персональных данных граждан...",
            kz: "Заң жобасы азаматтардың дербес деректерінің қауіпсіздігін күшейтуге бағытталған...",
            en: "The bill aims to strengthen the security of citizens' personal data..."
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        author: {
            ru: "Максим Иванов",
            kz: "Максим Иванов",
            en: "Maxim Ivanov"
        },
        tag: {
            ru: "Закон",
            kz: "Заң",
            en: "Law"
        },
        tagKey: "law",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card2.png",
        title: {
            ru: "Парламент рассмотрит новый законопроект о цифровой идентификации",
            kz: "Парламент цифрлық сәйкестендіру туралы жаңа заң жобасын қарастырады",
            en: "Parliament to review new digital ID legislation"
        },
        description: {
            ru: "Законопроект направлен на усиление безопасности персональных данных граждан...",
            kz: "Заң жобасы азаматтардың дербес деректерінің қауіпсіздігін күшейтуге бағытталған...",
            en: "The bill aims to strengthen the security of citizens' personal data..."
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        author: {
            ru: "Максим Иванов",
            kz: "Максим Иванов",
            en: "Maxim Ivanov"
        },
        tag: {
            ru: "Закон",
            kz: "Заң",
            en: "Law"
        },
        tagKey: "law",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card2.png",
        title: {
            ru: "Парламент рассмотрит новый законопроект о цифровой идентификации",
            kz: "Парламент цифрлық сәйкестендіру туралы жаңа заң жобасын қарастырады",
            en: "Parliament to review new digital ID legislation"
        },
        description: {
            ru: "Законопроект направлен на усиление безопасности персональных данных граждан...",
            kz: "Заң жобасы азаматтардың дербес деректерінің қауіпсіздігін күшейтуге бағытталған...",
            en: "The bill aims to strengthen the security of citizens' personal data..."
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        author: {
            ru: "Максим Иванов",
            kz: "Максим Иванов",
            en: "Maxim Ivanov"
        },
        tag: {
            ru: "Закон",
            kz: "Заң",
            en: "Law"
        },
        tagKey: "law",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card2.png",
        title: {
            ru: "Парламент рассмотрит новый законопроект о цифровой идентификации",
            kz: "Парламент цифрлық сәйкестендіру туралы жаңа заң жобасын қарастырады",
            en: "Parliament to review new digital ID legislation"
        },
        description: {
            ru: "Законопроект направлен на усиление безопасности персональных данных граждан...",
            kz: "Заң жобасы азаматтардың дербес деректерінің қауіпсіздігін күшейтуге бағытталған...",
            en: "The bill aims to strengthen the security of citizens' personal data..."
        },
        date: {
            ru: "14 февраля 2025",
            kz: "2025 жылғы 14 ақпан",
            en: "February 14, 2025"
        },
        author: {
            ru: "Максим Иванов",
            kz: "Максим Иванов",
            en: "Maxim Ivanov"
        },
        tag: {
            ru: "Закон",
            kz: "Заң",
            en: "Law"
        },
        tagKey: "law",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card1.png",
        title: {
            ru: "Новая платформа электронного правительства запущена в тестовом режиме",
            kz: "Электрондық үкіметтің жаңа платформасы сынақ режимінде іске қосылды",
            en: "New e-Government platform launched in test mode"
        },
        description: {
            ru: "Инновационная платформа предоставит гражданам улучшенный доступ к государственным услугам...",
            kz: "Инновациялық платформа азаматтарға мемлекеттік қызметтерге қолжетімділікті жақсартады...",
            en: "The innovative platform will provide citizens with improved access to public services..."
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        author: {
            ru: "Анна Петрова",
            kz: "Анна Петрова",
            en: "Anna Petrova"
        },
        tag: {
            ru: "Технологии",
            kz: "Технологиялар",
            en: "Technology"
        },
        tagKey: "technology",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card1.png",
        title: {
            ru: "Новая платформа электронного правительства запущена в тестовом режиме",
            kz: "Электрондық үкіметтің жаңа платформасы сынақ режимінде іске қосылды",
            en: "New e-Government platform launched in test mode"
        },
        description: {
            ru: "Инновационная платформа предоставит гражданам улучшенный доступ к государственным услугам...",
            kz: "Инновациялық платформа азаматтарға мемлекеттік қызметтерге қолжетімділікті жақсартады...",
            en: "The innovative platform will provide citizens with improved access to public services..."
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        author: {
            ru: "Анна Петрова",
            kz: "Анна Петрова",
            en: "Anna Petrova"
        },
        tag: {
            ru: "Технологии",
            kz: "Технологиялар",
            en: "Technology"
        },
        tagKey: "technology",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card1.png",
        title: {
            ru: "Новая платформа электронного правительства запущена в тестовом режиме",
            kz: "Электрондық үкіметтің жаңа платформасы сынақ режимінде іске қосылды",
            en: "New e-Government platform launched in test mode"
        },
        description: {
            ru: "Инновационная платформа предоставит гражданам улучшенный доступ к государственным услугам...",
            kz: "Инновациялық платформа азаматтарға мемлекеттік қызметтерге қолжетімділікті жақсартады...",
            en: "The innovative platform will provide citizens with improved access to public services..."
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        author: {
            ru: "Анна Петрова",
            kz: "Анна Петрова",
            en: "Anna Petrova"
        },
        tag: {
            ru: "Технологии",
            kz: "Технологиялар",
            en: "Technology"
        },
        tagKey: "technology",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card1.png",
        title: {
            ru: "Новая платформа электронного правительства запущена в тестовом режиме",
            kz: "Электрондық үкіметтің жаңа платформасы сынақ режимінде іске қосылды",
            en: "New e-Government platform launched in test mode"
        },
        description: {
            ru: "Инновационная платформа предоставит гражданам улучшенный доступ к государственным услугам...",
            kz: "Инновациялық платформа азаматтарға мемлекеттік қызметтерге қолжетімділікті жақсартады...",
            en: "The innovative platform will provide citizens with improved access to public services..."
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        author: {
            ru: "Анна Петрова",
            kz: "Анна Петрова",
            en: "Anna Petrova"
        },
        tag: {
            ru: "Технологии",
            kz: "Технологиялар",
            en: "Technology"
        },
        tagKey: "technology",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card1.png",
        title: {
            ru: "Новая платформа электронного правительства запущена в тестовом режиме",
            kz: "Электрондық үкіметтің жаңа платформасы сынақ режимінде іске қосылды",
            en: "New e-Government platform launched in test mode"
        },
        description: {
            ru: "Инновационная платформа предоставит гражданам улучшенный доступ к государственным услугам...",
            kz: "Инновациялық платформа азаматтарға мемлекеттік қызметтерге қолжетімділікті жақсартады...",
            en: "The innovative platform will provide citizens with improved access to public services..."
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        author: {
            ru: "Анна Петрова",
            kz: "Анна Петрова",
            en: "Anna Petrova"
        },
        tag: {
            ru: "Технологии",
            kz: "Технологиялар",
            en: "Technology"
        },
        tagKey: "technology",
        link: "/newsDetail"
    },
    {
        imgSrc: "/np_Card1.png",
        title: {
            ru: "Новая платформа электронного правительства запущена в тестовом режиме",
            kz: "Электрондық үкіметтің жаңа платформасы сынақ режимінде іске қосылды",
            en: "New e-Government platform launched in test mode"
        },
        description: {
            ru: "Инновационная платформа предоставит гражданам улучшенный доступ к государственным услугам...",
            kz: "Инновациялық платформа азаматтарға мемлекеттік қызметтерге қолжетімділікті жақсартады...",
            en: "The innovative platform will provide citizens with improved access to public services..."
        },
        date: {
            ru: "15 февраля 2025",
            kz: "2025 жылғы 15 ақпан",
            en: "February 15, 2025"
        },
        author: {
            ru: "Анна Петрова",
            kz: "Анна Петрова",
            en: "Anna Petrova"
        },
        tag: {
            ru: "Технологии",
            kz: "Технологиялар",
            en: "Technology"
        },
        tagKey: "technology",
        link: "/newsDetail"
    },
];

export default newsData;