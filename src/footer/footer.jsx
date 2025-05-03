import { useTranslation } from 'react-i18next';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation('footer');

  return (
    <footer>
      <div className={styles.footer_inner}>
        <div className={styles.upper_footer}>
          <div className={styles.first_col}>
            <div className={styles.title}>
              {t('footer.openGovTitle')}
            </div>
            <div className={styles.description}>
              {t('footer.openGovDescription')}
            </div>
            <div className={styles.soc_media}>
              <img src="/twitter.svg" alt="twitter" />
              <img src="/facebook.svg" alt="facebook" />
              <img src="/linkedIn.svg" alt="linkedIn" />
              <img src="/youtube.svg" alt="youtube" />
            </div>
          </div>

          <div className={styles.second_col}>
            <div className={styles.title}>
              {t('footer.navigation')}
            </div>
            <nav>
              <ul className={styles.nav_list}>
                <li className={styles.nav_item}><Link to="/">{t('footer.home')}</Link></li>
                <li className={styles.nav_item}><Link to="/aboutMe">{t('footer.aboutUs')}</Link></li>
                <li className={styles.nav_item}><Link to="/news">{t('footer.news')}</Link></li>
                <li className={styles.nav_item}><Link to="/members">{t('footer.communityMembers')}</Link></li>
                <li className={styles.nav_item}><Link to="/projects">{t('footer.projects')}</Link></li>
              </ul>
            </nav>
          </div>

          <div className={styles.third_col}>
            <div className={styles.title}>
              {t('footer.resources')}
            </div>
            <nav>
              <ul className={styles.nav_list}>
                <li className={styles.nav_item}><a href="">{t('footer.openData')}</a></li>
                <li className={styles.nav_item}><a href="">{t('footer.documentation')}</a></li>
                <li className={styles.nav_item}><a href="">{t('footer.api')}</a></li>
                <li className={styles.nav_item}><a href="">{t('footer.tools')}</a></li>
              </ul>
            </nav>
          </div>

          <div className={styles.fourth_col}>
            <div className={styles.title}>
              {t('footer.subscribe')}
            </div>
            <div className={styles.user_ineraction}>
              <input type="text" placeholder={t('footer.emailPlaceholder')} />
              <button><img src="/mail.svg" alt="" /></button>
            </div>
          </div>
        </div>
        <div className={styles.lower_footer}>
          <div className={styles.rights}>{t('footer.rights')}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;