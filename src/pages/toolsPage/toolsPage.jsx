import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Hero from "../../ui/hero";
import toolsData from "../../data/toolsData";
import useToolsMeta from "./useToolsMeta";
import s from "../../ui/page.module.css";

// Texts and SEO: ED-TOOLS RU/KK/EN (#8, unchanged); layout: design v1.2.
const ICONS = { openData: "▤", openBudgets: "▥", legalActs: "▣" };

function ToolsPage() {
    const { t } = useTranslation("toolsPage");
    useToolsMeta("catalog");

    return (
        <>
            <Header />
            <main className={s.page}>
                <Hero title={t("catalog.title")} art="▤">
                    <p className={s.lead}>{t("catalog.intro")}</p>
                </Hero>

                <section>
                    <div className={s.wrap}>
                        <ul className={s.grid}>
                            {Object.entries(toolsData).map(([key, tool]) => (
                                <li key={key} className={s.card}>
                                    <div className={s.icon} aria-hidden="true">{ICONS[key]}</div>
                                    <h2>{t(`catalog.cards.${key}.title`)}</h2>
                                    <p>{t(`catalog.cards.${key}.description`)}</p>
                                    <Link className={`${s.btn} ${s.secondary}`} to={tool.path}>
                                        {t(`catalog.cards.${key}.title`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ToolsPage;
