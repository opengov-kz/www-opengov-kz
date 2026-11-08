import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import styles from "./notFoundPage.module.css";

// Клиентская 404 для переходов внутри SPA; прямой запрос к неизвестному URL Vercel отдаёт public/404.html с HTTP 404.
function NotFoundPage() {
    const { t, i18n } = useTranslation("notFoundPage");
    const title = t("seoTitle");
    // Внутренний ключ казахского языка — kz, в HTML нужен kk.
    const lang = i18n.language === "kz" ? "kk" : i18n.language;

    useEffect(() => {
        const root = document.documentElement;
        const previousTitle = document.title;
        const previousLang = root.lang;
        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex";

        document.title = title;
        root.lang = lang;
        document.head.append(robots);

        return () => {
            document.title = previousTitle;
            root.lang = previousLang;
            robots.remove();
        };
    }, [title, lang]);

    return (
        <>
            <Header />
            <main className={styles.block}>
                <div className={styles.inner}>
                    <p className={styles.code} aria-hidden="true">404</p>
                    <h1 className={styles.title}>{t("title")}</h1>
                    <p className={styles.text}>{t("text")}</p>
                    <Link className={styles.link} to="/">{t("homeLink")}</Link>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default NotFoundPage;
