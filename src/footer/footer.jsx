import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

// v1.2 footer: only working internal links and the approved independence disclaimer; no subscription form or unverified contacts.
const LINKS = [
  { to: '/', key: 'home' },
  { to: '/open-government', key: 'openGovernment' },
  { to: '/tools', key: 'tools' },
  { to: '/community', key: 'community' },
  { to: '/about', key: 'aboutProject' },
];

function Footer() {
  const { t } = useTranslation(['footer', 'header']);

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div>
          <strong className={styles.brand}>OpenGov.kz</strong>
          <p className={styles.disclaimer}>{t('disclaimer')}</p>
        </div>
        <ul className={styles.links}>
          {LINKS.map(({ to, key }) => (
            <li key={to}><Link to={to}>{t(key, { ns: 'header' })}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
