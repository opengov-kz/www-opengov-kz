import styles from "./projectsDetailPage.module.css";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import ProjectDetailCard from "./projectDetailCard/projectDetailCard";
import ProjectDetailCard2 from "./projectDetailCard2/projectDetailCard2";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProjectDetailPage() {
    const { t } = useTranslation('projectDetailPage');

    return (
        <>
            <Header />
            <div className={styles.first_block}>
                <div className={styles.first_block_inner}>
                    <div className={styles.group1}>
                        <div className={styles.title}>{t('projectDetail.title')}</div>
                        <div className={styles.tag}>{t('projectDetail.status')}</div>
                    </div>
                    <div className={styles.date}>{t('projectDetail.period')}</div>
                    <div className={styles.description}>{t('projectDetail.description1')}</div>
                    <div className={styles.blue}>{t('projectDetail.blueText')}</div>
                    <ul className={styles.list}>
                        <li className={styles.item}>{t('projectDetail.tasks.0')}</li>
                        <li className={styles.item}>{t('projectDetail.tasks.1')}</li>
                        <li className={styles.item}>{t('projectDetail.tasks.2')}</li>
                        <li className={styles.item}>{t('projectDetail.tasks.3')}</li>
                    </ul>
                    <div className={styles.description}>{t('projectDetail.description2')}</div>
                    <div className={styles.group2}>
                        <Link><div className={styles.button1}><img src="/projectDetailPage_1.svg" alt="" />{t('projectDetail.projectWebsite')}</div></Link>
                        <Link target="_blank" to="https://github.com/Daelijek/qbsSolutions">
                            <div className={styles.button2}>
                                <img src="/projectDetailPage_2.svg" alt="" />{t('projectDetail.github')}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.second_block}>
                <div className={styles.second_block_inner}>
                    <div className={styles.title}>{t('projectDetail.teamTitle')}</div>
                    <div className={styles.cards}>
                        <ProjectDetailCard
                            imgSrc="/projectDetailPage_5.png"
                            name={t('projectDetail.team.0.name')}
                            profession={t('projectDetail.team.0.role')}
                        />

                        <ProjectDetailCard
                            imgSrc="/projectDetailPage_6.png"
                            name={t('projectDetail.team.0.name')}
                            profession={t('projectDetail.team.0.role')}
                        />

                        <ProjectDetailCard
                            imgSrc="/projectDetailPage_7.png"
                            name={t('projectDetail.team.0.name')}
                            profession={t('projectDetail.team.0.role')}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.third_block}>
                <div className={styles.third_block_inner}>
                    <div className={styles.title}>{t('projectDetail.similarProjectsTitle')}</div>

                    <div className={styles.cards}>
                        <ProjectDetailCard2
                            title={t('projectDetail.similarProjects.0.title')}
                            description={t('projectDetail.similarProjects.0.description')}
                            imgSrc="/projectDetailPage_8.png" />

                        <ProjectDetailCard2
                            title={t('projectDetail.similarProjects.1.title')}
                            description={t('projectDetail.similarProjects.1.description')}
                            imgSrc="/projectDetailPage_9.png" />

                        <ProjectDetailCard2
                            title={t('projectDetail.similarProjects.2.title')}
                            description={t('projectDetail.similarProjects.2.description')}
                            imgSrc="/projectDetailPage_10.png" />
                    </div>
                    <Link to="/projects">
                        <button className={styles.button}>{t('projectDetail.backToProjects')}</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProjectDetailPage;