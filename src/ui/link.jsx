import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PAGES, langOf, urlOf } from '../routing';

// Internal link that keeps the current language (#44, AC-05): `to` is the RU path of a page of src/routing.js and
// becomes its /kk or /en URL in that language; the language is the one of the i18next instance of the page.
function Link({ to, ...props }) {
    const { i18n } = useTranslation();
    const href = PAGES.some((p) => p.path === to) ? urlOf(langOf(i18n.language), to) : to;
    return <RouterLink to={href} {...props} />;
}

export default Link;
