import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import styles from "./membersDetailPage.module.css";
import MembersDetailCard from "./membersDetailCard/membersDetailCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MembersDetailPage() {
    const { t } = useTranslation('membersDetailPage');

    return (
        <>
            <Header />
            <div className={styles.first_block}>
                <div className={styles.first_block_inner}>
                    <img src="/memberDetailPage_1.png" alt="" />
                    <div className={styles.group}>
                        <div className={styles.title}>{t('member.name')}</div>
                        <div className={styles.tag}>@daelijek_og</div>
                        <div className={styles.profession}>{t('member.profession')}</div>
                        <div className={styles.group_inner}>
                            <img src="/memberDetailPage_2.svg" alt="" />
                            <img src="/memberDetailPage_3.svg" alt="" />
                            <img src="/memberDetailPage_4.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.second_block}>
                <div className={styles.second_block_inner}>
                    <div className={styles.title}>{t('about.title')}</div>
                    <div className={styles.description}>{t('about.description.0')}</div>
                    <div className={styles.description}>{t('about.description.1')}</div>
                    <div className={styles.description}>{t('about.description.2')}</div>
                </div>
            </div>
            <div className={styles.third_block}>
                <div className={styles.third_block_inner}>
                    <div className={styles.title}>{t('projects.title')}</div>
                    <div className={styles.cards}>
                        <MembersDetailCard
                            link="/projectDetail"
                            title={t('projects.list.0.title')}
                            description={t('projects.list.0.description')} />
                        <MembersDetailCard
                            link="/projectDetail"
                            title={t('projects.list.1.title')}
                            description={t('projects.list.1.description')} />
                        <MembersDetailCard
                            link="/projectDetail"
                            title={t('projects.list.2.title')}
                            description={t('projects.list.2.description')} />
                        <MembersDetailCard
                            link="/projectDetail"
                            title={t('projects.list.3.title')}
                            description={t('projects.list.3.description')} />
                    </div>
                    <Link to="/members">
                        <button className={styles.button}>{t('projects.backButton')}</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MembersDetailPage;