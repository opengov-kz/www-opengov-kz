import styles from "./mainPage.module.css"
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Card from "./mainPageCard1/card";
import Card2 from "./card2/card2";
import NewsCard from "./newsCards/newsCard";
import ProjectCards from "./projectCards/projectCards";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MainPage() {
    const { t } = useTranslation('mainPage'); // 👈 указываем namespace
    return (
        <>
            <Header />
            <div className={styles.first_block}>
                <div className={styles.first_block_inner}>
                    <div className={styles.group}>
                        <div className={styles.title}>{t('mainPage.title1')}</div>
                        <div className={styles.description}>{t('mainPage.description1')}</div>
                        <Link to="/aboutMe"><button className={styles.more_button}>{t('mainPage.learnMore')}</button></Link>
                    </div>
                    <img src="/mainPage_1.png" alt="" />
                </div>
            </div>

            <div className={styles.second_block}>
                <div className={styles.second_block_inner}>
                    <div className={styles.title}>{t('mainPage.title2')}</div>
                    <div className={styles.description}>{t('mainPage.description2')}</div>
                    <div className={styles.cards}>
                        <Card imgSrc='/mp_Card1.svg' title={t('mainPage.card1.title')} description={t('mainPage.card1.desc')} />
                        <Card imgSrc='/mp_Card2.svg' title={t('mainPage.card2.title')} description={t('mainPage.card2.desc')} />
                        <Card imgSrc='/mp_Card3.svg' title={t('mainPage.card3.title')} description={t('mainPage.card3.desc')} />
                    </div>
                </div>
            </div>

            <div className={styles.third_block}>
                <div className={styles.third_block_inner}>
                    <img className={styles.img} src="/mainPage_2.png" alt="" />
                    <div className={styles.group}>
                        <div className={styles.title}>{t('mainPage.title3')}</div>
                        <div className={styles.description}>{t('mainPage.description3')}</div>
                        <ul className={styles.list}>
                            <li className={styles.list_item}><img src="/mainPage_3.svg" alt="" /> {t('mainPage.data1')}</li>
                            <li className={styles.list_item}><img src="/mainPage_3.svg" alt="" /> {t('mainPage.data2')}</li>
                            <li className={styles.list_item}><img src="/mainPage_3.svg" alt="" /> {t('mainPage.data3')}</li>
                            <li className={styles.list_item}><img src="/mainPage_3.svg" alt="" /> {t('mainPage.data4')}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.fourth_block}>
                <div className={styles.fourth_block_inner}>
                    <div className={styles.title}>{t('mainPage.title4')}</div>
                    <div className={styles.cards}>
                        <Card2 imgSrc='/mp_Card4.svg' title={t('mainPage.card4.title')} description={t('mainPage.card4.desc')} />
                        <Card2 imgSrc='/mp_Card5.svg' title={t('mainPage.card5.title')} description={t('mainPage.card5.desc')} />
                        <Card2 imgSrc='/mp_Card6.svg' title={t('mainPage.card6.title')} description={t('mainPage.card6.desc')} />
                        <Card2 imgSrc='/mp_Card7.svg' title={t('mainPage.card7.title')} description={t('mainPage.card7.desc')} />
                    </div>
                </div>
            </div>

            <div className={styles.fifth_block}>
                <div className={styles.fifth_block_inner}>
                    <div className={styles.title}>{t('mainPage.newsTitle')}</div>
                    <div className={styles.cards}>
                        <NewsCard imgSrc='/mainPage_4.png' date="15 марта 2024" title={t('mainPage.news1.title')} description={t('mainPage.news1.desc')} link="/newsDetail" />
                        <NewsCard imgSrc='/mainPage_5.png' date="12 марта 2024" title={t('mainPage.news2.title')} description={t('mainPage.news2.desc')} link="/newsDetail" />
                        <NewsCard imgSrc='/mainPage_6.png' date="10 марта 2024" title={t('mainPage.news3.title')} description={t('mainPage.news3.desc')} link="/newsDetail" />
                    </div>
                </div>
            </div>

            <div className={styles.sixth_block}>
                <div className={styles.sixth_block_inner}>
                    <div className={styles.title}>{t('mainPage.projectTitle')}</div>
                    <div className={styles.cards}>
                        <ProjectCards
                            imgSrc='/mp_Card9.svg'
                            title={t('mainPage.project1.title')}
                            status={t('mainPage.project1.status')}
                            description={t('mainPage.project1.desc')}
                            progress="70%"
                            link="/projectDetail" />
                        <ProjectCards
                            imgSrc='/mp_Card10.svg'
                            title={t('mainPage.project2.title')}
                            status={t('mainPage.project2.status')}
                            description={t('mainPage.project2.desc')}
                            progress="90%"
                            link="/projectDetail" />
                        <ProjectCards
                            imgSrc='/mp_Card11.svg'
                            title={t('mainPage.project3.title')}
                            status={t('mainPage.project3.status')}
                            description={t('mainPage.project3.desc')}
                            progress="100%"
                            link="/projectDetail" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MainPage;