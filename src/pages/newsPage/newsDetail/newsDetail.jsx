import { Link } from "react-router-dom";
import Footer from "../../../footer/footer";
import Header from "../../../header/header";
import { useTranslation } from "react-i18next";  // Импортируем useTranslation для локализации
import styles from "./newsDetail.module.css";
import NewsDetailCard from "./newsDetailCard/newsDetailCard";

function NewsDetail() {
    const { t } = useTranslation('newsDetail');  // Инициализируем t для доступа к переводу

    return (
        <>
            <Header />
            <div className={styles.page}>
                <div className={styles.first_block}>
                    <div className={styles.first_block_inner}>
                        <div className={styles.title}>
                            {t('newsDetail.title')}  {/* Перевод заголовка */}
                        </div>
                        <div className={styles.group1}>
                            <div className={styles.date}>{t('newsDetail.date')}</div>
                            <div className={styles.author}>{t('newsDetail.author')}</div>
                            <div className={styles.status}>{t('newsDetail.status')}</div>
                        </div>
                        <div className={styles.group2}>
                            <div className={styles.tag}>{t('newsDetail.tags.0')}</div>
                            <div className={styles.tag}>{t('newsDetail.tags.1')}</div>
                            <div className={styles.tag}>{t('newsDetail.tags.2')}</div>
                        </div>
                        <img src="/newsDetailPage_1.png" alt={t('newsDetail.imageAlt')} />
                        <div className={styles.info}>{t('newsDetail.info')}</div>
                        <div className={styles.blue}>{t('newsDetail.blueText')}</div>
                        <ul className={styles.list}>
                            <li className={styles.item}>{t('newsDetail.list.0')}</li>
                            <li className={styles.item}>{t('newsDetail.list.1')}</li>
                            <li className={styles.item}>{t('newsDetail.list.2')}</li>
                            <li className={styles.item}>{t('newsDetail.list.3')}</li>
                        </ul>
                        <div className={styles.quote}>
                            <i>{t('newsDetail.quote')}</i>
                        </div>
                        <div className={styles.info}>{t('newsDetail.moreInfo')}</div>
                    </div>
                </div>

                <div className={styles.second_block}>
                    <div className={styles.second_block_inner}>
                        <div className={styles.share}><img src="/newsDetailPage_2.svg" alt="" /> {t('newsDetail.share')}</div>
                        <div className={styles.group3}>
                            <img src="/newsDetailPage_3.svg" alt="" />
                            <img src="/newsDetailPage_4.svg" alt="" />
                            <img src="/newsDetailPage_5.svg" alt="" />
                            <img src="/newsDetailPage_6.svg" alt="" />
                        </div>
                    </div>
                </div>

                <div className={styles.third_block}>
                    <div className={styles.third_block_inner}>
                        <div className={styles.title}>{t('newsDetail.similarArticles')}</div>
                        <div className={styles.cards}>
                            <NewsDetailCard
                                title="Цифровая трансформация государственных услуг"
                                date="14.02.2024"
                                imgSrc="/newsDetailCard_1.png" />

                            <NewsDetailCard
                                title="Цифровая трансформация государственных услуг"
                                date="14.02.2024"
                                imgSrc="/newsDetailCard_1.png" />

                            <NewsDetailCard
                                title="Цифровая трансформация государственных услуг"
                                date="14.02.2024"
                                imgSrc="/newsDetailCard_1.png" />
                        </div>
                        <Link to="/news">
                            <button className={styles.button}>{t('newsDetail.backToNews')}</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NewsDetail;