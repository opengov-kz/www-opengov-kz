import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

const LANGS = [
  { key: 'ru', label: 'РУС' },
  { key: 'kz', label: 'ҚАЗ' },
  { key: 'en', label: 'ENG' },
];

function Header() {
  const { t, i18n } = useTranslation('header');
  const path = useLocation().pathname.replace(/(.)\/+$/, '$1'); // '/tools/' is the same page as '/tools'
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
          {LANGS.map(({ key, label }) => (
            <li key={key}>
              <button
                type="button"
                aria-pressed={i18n.language === key}
                onClick={() => i18n.changeLanguage(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
