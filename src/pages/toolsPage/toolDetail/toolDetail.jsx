import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import Hero from "../../../ui/hero";
import ExternalLink from "../../../ui/externalLink";
import toolsData from "../../../data/toolsData";
import useToolsMeta from "../useToolsMeta";
import s from "../../../ui/page.module.css";

// Texts and SEO: ED-TOOLS RU/KK/EN (#8, unchanged); layout: v1.2 portal template (UX-02).
const ICONS = { openData: "▤", openBudgets: "▥", legalActs: "▣" };

function ToolDetail({ tool }) {
    const { t } = useTranslation("toolsPage");
    const { t: th } = useTranslation("header");
    const section = `portals.${tool}`;
    const { path, url } = toolsData[tool];
    useToolsMeta(section);

    return (
        <>
            <Header />
            <main className={s.page}>
                <Hero
                    crumbs={[
                        { to: "/", label: th("home") },
                        { to: "/tools", label: th("tools") },
                        { to: path, label: t(`catalog.cards.${tool}.title`) },
                    ]}
                    title={t(`${section}.title`)}
                    art={ICONS[tool]}
                >
                    <p className={s.lead}>{t(`${section}.intro`)}</p>
                </Hero>

                <section>
                    <div className={s.wrap}>
                        <div className={`${s.grid} ${s.two}`}>
                            <article className={s.card}>
                                <h2>{t(`${section}.actionsTitle`)}</h2>
                                <p>{t(`${section}.actionsText`)}</p>
                            </article>
                            <article className={s.card}>
                                <h2>{t(`${section}.startTitle`)}</h2>
                                <p><Trans t={t} i18nKey={`${section}.startText`} components={{ strong: <strong /> }} /></p>
                            </article>
                        </div>
                        <p className={s.official}>
                            <strong>{t("officialPortal")}</strong>{" "}
                            <ExternalLink className={s.inline_link} href={url}>{url}</ExternalLink>
                        </p>
                        <Link className={`${s.btn} ${s.secondary}`} to="/tools">{t("allTools")}</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ToolDetail;
