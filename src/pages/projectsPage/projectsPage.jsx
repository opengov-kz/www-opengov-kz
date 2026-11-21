import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Hero from "../../ui/hero";
import usePageMeta from "../../usePageMeta";
import s from "../../ui/page.module.css";

// /projects «Направления работы» (#14): Approved RU/KK/EN + SEO Q-OGK-PROJECTS-ED-03-01=A, FR-PROJ-01…04.
// No OG/mock cards (Q-OGK-PROJECTS-PUB-02=A); projectsData.js and projectsCard1/ are kept but not rendered (K5=A).
function ProjectsPage() {
    const { t } = useTranslation("projectsPage");
    usePageMeta(t("seoTitle"), t("seoDescription"));

    return (
        <>
            <Header />
            <main className={s.page}>
                <Hero title={t("hero.title")} art="◈">
                    <p className={s.lead}>{t("hero.lead")}</p>
                    <p className={s.lead}>{t("hero.about")}</p>
                </Hero>

                <section>
                    <div className={s.wrap}>
                        <ul className={s.grid}>
                            {t("areas", { returnObjects: true }).map((area) => (
                                <li key={area.title} className={s.card}>
                                    <h2>{area.title}</h2>
                                    <p>{area.text}</p>
                                </li>
                            ))}
                        </ul>
                        <p className={s.section_note}>{t("note")}</p>
                        <div className={s.next_steps}>
                            <p>{t("cta.question")}</p>
                            <Link className={`${s.btn} ${s.secondary}`} to="/community">{t("cta.link")}</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ProjectsPage;
