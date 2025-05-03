import { useTranslation } from 'react-i18next';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import styles from "./aboutPage.module.css";
import AboutCard1 from "./aboutCard1/aboutCard1";
import AboutCard2 from "./aboutCard2/aboutCard2";
import AboutCard3 from "./aboutCard3/aboutCard3";

function AboutPage() {
    const { t } = useTranslation('aboutPage');

    return (
        <>
            <Header />
            <div className={styles.first_block}>
                <div className={styles.first_block_inner}>
                    <div className={styles.title}>{t('aboutPage.openDataTitle')}</div>
                    <div className={styles.description}>{t('aboutPage.openDataDescription')}</div>
                </div>
            </div>

            <div className={styles.second_block}>
                <div className={styles.second_block_inner}>
                    <div className={styles.title}>{t('aboutPage.openDataDevelopment')}</div>
                    <div className={styles.cards}>
                        <AboutCard1
                            year="2015"
                            title={t('aboutPage.initiativeLaunch')}
                            description={t('aboutPage.initiativeLaunchDescription')} />
                        <AboutCard1
                            year="2017"
                            title={t('aboutPage.ecosystemExpansion')}
                            description={t('aboutPage.ecosystemExpansionDescription')} />
                        <AboutCard1
                            year="2019"
                            title={t('aboutPage.technologicalBreakthrough')}
                            description={t('aboutPage.technologicalBreakthroughDescription')} />
                        <AboutCard1
                            year="2020"
                            title={t('aboutPage.internationalCooperation')}
                            description={t('aboutPage.internationalCooperationDescription')} />
                        <AboutCard1
                            year="2022"
                            title={t('aboutPage.infrastructureDevelopment')}
                            description={t('aboutPage.infrastructureDevelopmentDescription')} />
                        <AboutCard1
                            year="2024"
                            title={t('aboutPage.newHorizons')}
                            description={t('aboutPage.newHorizonsDescription')} />
                    </div>
                </div>
            </div>

            <div className={styles.third_block}>
                <div className={styles.third_block_inner}>
                    <div className={styles.title}>{t('aboutPage.keyPlatforms')}</div>
                    <div className={styles.cards}>
                        <AboutCard2
                            imgSrc="/ap_Card1.svg"
                            title="opengov.kz"
                            description={t('aboutPage.platform1Description')} />
                        <AboutCard2
                            imgSrc="/ap_Card2.svg"
                            title="opengov.kz"
                            description={t('aboutPage.platform2Description')} />
                        <AboutCard2
                            imgSrc="/ap_Card3.svg"
                            title="opengov.kz"
                            description={t('aboutPage.platform3Description')} />
                    </div>
                </div>
            </div>

            <div className={styles.fourth_block}>
                <div className={styles.fourth_block_inner}>
                    <div className={styles.title}>{t('aboutPage.legislation')}</div>
                    <div className={styles.group}>
                        <div className={styles.left_side}>
                            <div className={styles.description}>{t('aboutPage.legislationDescription')}</div>
                            <ul className={styles.list}>
                                <li className={styles.item}>
                                    <img src="/ap_Card1.svg" alt="" />
                                    <div className={styles.textGroup}>
                                        <div className={styles.item_title}>{t('aboutPage.lawTitle')}</div>
                                        <div className={styles.label}>{t('aboutPage.lawDescription')}</div>
                                    </div>
                                </li>

                                <li className={styles.item}>
                                    <img src="/ap_Card1.svg" alt="" />
                                    <div className={styles.textGroup}>
                                        <div className={styles.item_title}>{t('aboutPage.resolutionTitle')}</div>
                                        <div className={styles.label}>{t('aboutPage.resolutionDescription')}</div>
                                    </div>
                                </li>

                                <li className={styles.item}>
                                    <img src="/ap_Card1.svg" alt="" />
                                    <div className={styles.textGroup}>
                                        <div className={styles.item_title}>{t('aboutPage.dataFormatRequirementsTitle')}</div>
                                        <div className={styles.label}>{t('aboutPage.dataFormatRequirementsDescription')}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.right_side}>
                            <div className={styles.right_title}>{t('aboutPage.regulationStructureTitle')}</div>
                            <img src="/aboutPage_2.png" alt="" />
                            <div className={styles.description}>{t('aboutPage.regulationStructureDescription')}</div>
                        </div>
                    </div>
                </div>
            </div >

            <div className={styles.fifth_block}>
                <div className={styles.fifth_block_inner}>
                    <div className={styles.title}>{t('aboutPage.successExamples')}</div>
                    <div className={styles.cards}>
                        <AboutCard3
                            imgSrc="/ap_Card4.png"
                            tag="Данные"
                            title={t('aboutPage.openDatabaseTitle')}
                            description={t('aboutPage.openDatabaseDescription')}
                            link="/projectDetail" />
                        <AboutCard3
                            imgSrc="/ap_Card5.png"
                            tag="Образование"
                            title={t('aboutPage.digitalSchoolsTitle')}
                            description={t('aboutPage.digitalSchoolsDescription')}
                            link="/projectDetail" />
                        <AboutCard3
                            imgSrc="/ap_Card6.png"
                            tag="Бизнес"
                            title={t('aboutPage.businessDevelopmentTitle')}
                            description={t('aboutPage.businessDevelopmentDescription')}
                            link="/projectDetail" />
                        <AboutCard3
                            imgSrc="/ap_Card7.png"
                            tag="Экология"
                            title={t('aboutPage.environmentMonitoringTitle')}
                            description={t('aboutPage.environmentMonitoringDescription')}
                            link="/projectDetail" />
                    </div>
                </div>
            </div>

            <div className={styles.sixth_block}>
                <div className={styles.sixth_block_inner}>
                    <div className={styles.left_side}>
                        <div className={styles.title}>{t('aboutPage.opengovRoleTitle')}</div>
                        <div className={styles.group}>
                            <div className={styles.description}>{t('aboutPage.opengovRoleDescription')}</div>
                            <ul className={styles.list}>

                                <li className={styles.item}>
                                    <img src="/aboutPage_3.svg" alt="" />
                                    <div className={styles.textGroup}>
                                        <div className={styles.item_title}>{t('aboutPage.dataAccessTitle')}</div>
                                        <div className={styles.label}>{t('aboutPage.dataAccessDescription')}</div>
                                    </div>
                                </li>

                                <li className={styles.item}>
                                    <img src="/aboutPage_4.svg" alt="" />
                                    <div className={styles.textGroup}>
                                        <div className={styles.item_title}>{t('aboutPage.communityTitle')}</div>
                                        <div className={styles.label}>{t('aboutPage.communityDescription')}</div>
                                    </div>
                                </li>

                                <li className={styles.item}>
                                    <img src="/aboutPage_5.svg" alt="" />
                                    <div className={styles.textGroup}>
                                        <div className={styles.item_title}>{t('aboutPage.innovationsTitle')}</div>
                                        <div className={styles.label}>{t('aboutPage.innovationsDescription')}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.card}>
                            <div className={styles.number}>10K+</div>
                            <div className={styles.text}>{t('aboutPage.dataSets')}</div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.number}>500+</div>
                            <div className={styles.text}>{t('aboutPage.activeUsers')}</div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.number}>100+</div>
                            <div className={styles.text}>{t('aboutPage.projectsCompleted')}</div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.number}>50+</div>
                            <div className={styles.text}>{t('aboutPage.partners')}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AboutPage;