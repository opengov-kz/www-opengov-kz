import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './header.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation('header');
  const currentLang = i18n.language;

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <header>
      <div className={styles.header_inner}>
        <div className={styles.logo}>OpenGov.kz</div>
      </div>

      <button className={styles.burger} onClick={toggleMenu}>
        <span className={styles.burger_line}></span>
        <span className={styles.burger_line}></span>
        <span className={styles.burger_line}></span>
      </button>

      <nav className={`${styles.nav} ${isOpen ? styles.show : ''}`}>
        <ul className={styles.nav_list}>
          <li className={styles.nav_item}>
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              {t('home')}
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <NavLink
              to="/aboutMe"
              onClick={toggleMenu}
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              {t('about')}
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <NavLink
              to="/news"
              onClick={toggleMenu}
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              {t('news')}
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <NavLink
              to="/members"
              onClick={toggleMenu}
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              {t('members')}
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <NavLink
              to="/projects"
              onClick={toggleMenu}
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              {t('projects')}
            </NavLink>
          </li>
        </ul>

        <ul className={styles.lang_list}>
          <li className={`${styles.lang_item} ${currentLang === 'ru' ? styles.active : ''}`}>
            <button onClick={() => changeLanguage('ru')}>РУС</button>
          </li>
          <li className={`${styles.lang_item} ${currentLang === 'kz' ? styles.active : ''}`}>
            <button onClick={() => changeLanguage('kz')}>ҚАЗ</button>
          </li>
          <li className={`${styles.lang_item} ${currentLang === 'en' ? styles.active : ''}`}>
            <button onClick={() => changeLanguage('en')}>ENG</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;