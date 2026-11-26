import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Link from '../ui/link';
import { LANGS, matchUrl, urlOf } from '../routing';
import styles from './header.module.css';

// v1.2 navigation (Sitemap MVP): four sections; on narrow screens it wraps onto a second row (Q-OGK-DESIGN-11=A), no burger.
// aria-current is set explicitly per item and drives the active style: "page" on the item's own page; for a section
// item (Tools) "true" on its child pages instead of a false "page" (#40 AC-01); no attribute on any other item.
const NAV = [
  { to: '/open-government', key: 'openGovernment' },
  { to: '/tools', key: 'tools', section: true },
  { to: '/community', key: 'community' },
  { to: '/about', key: 'aboutProject' },
];

function Header() {
  const { t, i18n } = useTranslation('header');
  const pathname = useLocation().pathname.replace(/(.)\/+$/, '$1'); // '/tools/' is the same page as '/tools'
  const route = matchUrl(pathname); // #44: a language URL; its menu state is that of the RU page
  const path = route ? route.page.path : pathname;
  const current = (to, section) => (path === to ? 'page' : section && path.startsWith(`${to}/`) ? 'true' : undefined);

  return (
    <header className={styles.top}>
      <div className={styles.wrap}>
        <Link className={styles.logo} to="/">OpenGov.kz</Link>

        <nav aria-label={t('navLabel')} className={styles.nav}>
          {NAV.map(({ to, key, section }) => (
            <Link key={to} to={to} aria-current={current(to, section)}>{t(key)}</Link>
          ))}
        </nav>

        <ul className={styles.lang}>
          {LANGS.map(({ key, label, name, hreflang }) => (
            <li key={key}>
              {route ? (
                // #44 (AC-02 of #40): a link to the same page in that language; the name contains the visible label.
                <RouterLink
                  to={urlOf(LANGS.find((l) => l.key === key), route.page.path)}
                  lang={hreflang}
                  hrefLang={hreflang}
                  aria-label={name}
                  aria-current={route.lang.key === key ? 'page' : undefined}
                >
                  {label}
                </RouterLink>
              ) : (
                <button type="button" aria-pressed={i18n.language === key} onClick={() => i18n.changeLanguage(key)}>
                  {label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
