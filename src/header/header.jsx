import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Link from '../ui/link';
import { LANGS, langOfPath, matchUrl, urlOf } from '../routing';
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
  const { t } = useTranslation('header');
  const pathname = useLocation().pathname.replace(/(.)\/+$/, '$1'); // '/tools/' is the same page as '/tools'
  const route = matchUrl(pathname); // #44: a language URL; its menu state is that of the RU page
  const path = route ? route.page.path : pathname;
  // #44 (AC-06): each language is a link to the same page in that language; on the client NotFound (no language URL)
  // it is the home page of that language.
  const currentLang = route ? route.lang : langOfPath(pathname);
  const targetPath = route ? route.page.path : '/';
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
          {LANGS.map((lang) => (
            <li key={lang.key}>
              {/* AC-02 of #40, P0-05=A + AC-06 decision A: accessible name «РУС — Русский», visible РУС/ҚАЗ/ENG */}
              <RouterLink
                to={urlOf(lang, targetPath)}
                lang={lang.hreflang}
                hrefLang={lang.hreflang}
                aria-label={lang.a11yName}
                aria-current={currentLang.key === lang.key ? 'page' : undefined}
              >
                {lang.label}
              </RouterLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
