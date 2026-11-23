import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './header.module.css';

// v1.2 navigation (Sitemap MVP): four sections; on narrow screens it wraps onto a second row (Q-OGK-DESIGN-11=A), no burger.
// section: the item also stays active on child pages, marked aria-current="true" there instead of a false "page" (#40 AC-01).
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
  const { pathname } = useLocation();

  return (
    <header className={styles.top}>
      <div className={styles.wrap}>
        <Link className={styles.logo} to="/">OpenGov.kz</Link>

        <nav aria-label={t('navLabel')} className={styles.nav}>
          {NAV.map(({ to, key, section }) => (
            <NavLink key={to} to={to} end={!section} aria-current={pathname === to ? 'page' : 'true'}>{t(key)}</NavLink>
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
