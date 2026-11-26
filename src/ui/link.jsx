import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PAGES, langOf, urlOf } from '../routing';

// Internal link that keeps the current language URL (#44): a page with language URLs (src/routing.js) gets the
// /kk or /en prefix; RU-only routes keep their plain path until Phase 1.
function Link({ to, ...props }) {
    const { i18n } = useTranslation();
    const href = PAGES.some((p) => p.path === to) ? urlOf(langOf(i18n.language), to) : to;
    return <RouterLink to={href} {...props} />;
}

export default Link;
