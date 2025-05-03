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

import aboutPage_ru from './locales/ru/aboutPage.json';
import aboutPage_kz from './locales/kz/aboutPage.json';
import aboutPage_en from './locales/en/aboutPage.json';

import newsDetail_ru from './locales/ru/newsDetail.json';
import newsDetail_kz from './locales/kz/newsDetail.json';
import newsDetail_en from './locales/en/newsDetail.json';

import projectDetailPage_ru from './locales/ru/projectDetailPage.json';
import projectDetailPage_kz from './locales/kz/projectDetailPage.json';
import projectDetailPage_en from './locales/en/projectDetailPage.json';

import membersDetailPage_ru from './locales/ru/membersDetailPage.json';
import membersDetailPage_kz from './locales/kz/membersDetailPage.json';
import membersDetailPage_en from './locales/en/membersDetailPage.json';

import newsPage_ru from './locales/ru/newsPage.json';
import newsPage_kz from './locales/kz/newsPage.json';
import newsPage_en from './locales/en/newsPage.json';

import projectsPage_ru from './locales/ru/projectsPage.json';
import projectsPage_kz from './locales/kz/projectsPage.json';
import projectsPage_en from './locales/en/projectsPage.json';

import membersPage_ru from './locales/ru/membersPage.json';
import membersPage_kz from './locales/kz/membersPage.json';
import membersPage_en from './locales/en/membersPage.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: {
                header: header_ru,
                mainPage: mainPage_ru,
                footer: footer_ru,
                aboutPage: aboutPage_ru,
                newsDetail: newsDetail_ru,
                projectDetailPage: projectDetailPage_ru,
                membersDetailPage: membersDetailPage_ru,
                newsPage: newsPage_ru,
                projectsPage: projectsPage_ru,
                membersPage: membersPage_ru,
            },
            kz: {
                header: header_kz,
                mainPage: mainPage_kz,
                footer: footer_kz,
                aboutPage: aboutPage_kz,
                newsDetail: newsDetail_kz,
                projectDetailPage: projectDetailPage_kz,
                membersDetailPage: membersDetailPage_kz,
                newsPage: newsPage_kz,
                projectsPage: projectsPage_kz,
                membersPage: membersPage_kz,
            },
            en: {
                header: header_en,
                mainPage: mainPage_en,
                footer: footer_en,
                aboutPage: aboutPage_en,
                newsDetail: newsDetail_en,
                projectDetailPage: projectDetailPage_en,
                membersDetailPage: membersDetailPage_en,
                newsPage: newsPage_en,
                projectsPage: projectsPage_en,
                membersPage: membersPage_en,
            },
        },
        lng: 'ru', // язык по умолчанию
        fallbackLng: 'ru',
        ns: ['header', 'mainPage', 'footer', 'aboutPage', 'newsDetail', 'projectDetailPage', 'membersDetailPage', 'newsPage', 'projectsPage', 'membersPage'], // список всех используемых неймспейсов
        defaultNS: 'header', // по умолчанию будет использоваться header, если не указан явно
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;