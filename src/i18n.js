import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import header_ru from './locales/ru/header.json';
import header_kz from './locales/kz/header.json';
import header_en from './locales/en/header.json';

import mainPage_ru from './locales/ru/mainPage.json';
import mainPage_kz from './locales/kz/mainPage.json';
import mainPage_en from './locales/en/mainPage.json';

import footer_ru from './locales/ru/footer.json';
import footer_kz from './locales/kz/footer.json';
import footer_en from './locales/en/footer.json';

import projectsPage_ru from './locales/ru/projectsPage.json';
import projectsPage_kz from './locales/kz/projectsPage.json';
import projectsPage_en from './locales/en/projectsPage.json';

import toolsPage_ru from './locales/ru/toolsPage.json';
import toolsPage_kz from './locales/kz/toolsPage.json';
import toolsPage_en from './locales/en/toolsPage.json';

import notFoundPage_ru from './locales/ru/notFoundPage.json';
import notFoundPage_kz from './locales/kz/notFoundPage.json';
import notFoundPage_en from './locales/en/notFoundPage.json';

import openGovernmentPage_ru from './locales/ru/openGovernmentPage.json';
import openGovernmentPage_kz from './locales/kz/openGovernmentPage.json';
import openGovernmentPage_en from './locales/en/openGovernmentPage.json';
import communityPage_ru from './locales/ru/communityPage.json';
import communityPage_kz from './locales/kz/communityPage.json';
import communityPage_en from './locales/en/communityPage.json';
import aboutProjectPage_ru from './locales/ru/aboutProjectPage.json';
import aboutProjectPage_kz from './locales/kz/aboutProjectPage.json';
import aboutProjectPage_en from './locales/en/aboutProjectPage.json';

// FR-SUI-01/02: <html lang> следует за i18next; внутренний ключ казахского kz, в HTML стандартный код kk.
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng === 'kz' ? 'kk' : lng;
});

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: {
                header: header_ru,
                mainPage: mainPage_ru,
                footer: footer_ru,
                projectsPage: projectsPage_ru,
                toolsPage: toolsPage_ru,
                notFoundPage: notFoundPage_ru,
                openGovernmentPage: openGovernmentPage_ru,
                communityPage: communityPage_ru,
                aboutProjectPage: aboutProjectPage_ru,
            },
            kz: {
                header: header_kz,
                mainPage: mainPage_kz,
                footer: footer_kz,
                projectsPage: projectsPage_kz,
                toolsPage: toolsPage_kz,
                notFoundPage: notFoundPage_kz,
                openGovernmentPage: openGovernmentPage_kz,
                communityPage: communityPage_kz,
                aboutProjectPage: aboutProjectPage_kz,
            },
            en: {
                header: header_en,
                mainPage: mainPage_en,
                footer: footer_en,
                projectsPage: projectsPage_en,
                toolsPage: toolsPage_en,
                notFoundPage: notFoundPage_en,
                openGovernmentPage: openGovernmentPage_en,
                communityPage: communityPage_en,
                aboutProjectPage: aboutProjectPage_en,
            },
        },
        lng: 'ru', // язык по умолчанию
        fallbackLng: 'ru',
        ns: ['header', 'mainPage', 'footer', 'projectsPage', 'toolsPage', 'notFoundPage', 'openGovernmentPage', 'communityPage', 'aboutProjectPage'], // список всех используемых неймспейсов
        defaultNS: 'header', // по умолчанию будет использоваться header, если не указан явно
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;