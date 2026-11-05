import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import toolsData from "../../data/toolsData";
import useToolsMeta from "./useToolsMeta";
import styles from "./toolsPage.module.css";

function ToolsPage() {
    const { t } = useTranslation("toolsPage");
    useToolsMeta("catalog");

    return (
        <>
            <Header />
            <main>
                <div className={styles.first_block}>
                    <div className={styles.first_block_inner}>
                        <h1 className={styles.title}>{t("catalog.title")}</h1>
                        <p className={styles.description}>{t("catalog.intro")}</p>
                    </div>
                </div>

                <div className={styles.second_block}>
                    <ul className={styles.cards}>
                        {Object.entries(toolsData).map(([key, tool]) => (
                            <li key={key} className={styles.card}>
                                <h2 className={styles.card_title}>
                                    <Link to={tool.path}>{t(`catalog.cards.${key}.title`)}</Link>
                                </h2>
                                <p className={styles.card_description}>
                                    {t(`catalog.cards.${key}.description`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ToolsPage;
