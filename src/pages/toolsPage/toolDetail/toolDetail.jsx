import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import toolsData from "../../../data/toolsData";
import useToolsMeta from "../useToolsMeta";
import styles from "./toolDetail.module.css";

function ToolDetail({ tool }) {
    const { t } = useTranslation("toolsPage");
    const section = `portals.${tool}`;
    useToolsMeta(section);

    return (
        <>
            <Header />
            <main>
                <div className={styles.first_block}>
                    <div className={styles.first_block_inner}>
                        <h1 className={styles.title}>{t(`${section}.title`)}</h1>
                        <p className={styles.text}>{t(`${section}.intro`)}</p>
                    </div>
                </div>

                <div className={styles.second_block}>
                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>{t(`${section}.actionsTitle`)}</h2>
                        <p className={styles.text}>{t(`${section}.actionsText`)}</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>{t(`${section}.startTitle`)}</h2>
                        <p className={styles.text}>
                            <Trans t={t} i18nKey={`${section}.startText`} components={{ strong: <strong /> }} />
                        </p>
                    </section>

                    <div className={styles.links}>
                        <a className={styles.portal} href={toolsData[tool].url}>
                            {t("officialPortal")} {toolsData[tool].url}
                            <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                                <path d="M5 11 11 5M6 5h5v5" />
                            </svg>
                        </a>
                        <Link className={styles.back} to="/tools">
                            <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                                <path d="M13 8H3M7 4 3 8l4 4" />
                            </svg>
                            {t("allTools")}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ToolDetail;
