import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Внутренний ключ казахского языка — kz, но в HTML нужен стандартный код kk.
const htmlLang = (language) => (language === "kz" ? "kk" : language);

// Очистка возвращает значения index.html: старые маршруты остаются без изменений.
function useToolsMeta(section) {
    const { t, i18n } = useTranslation("toolsPage");
    const title = t(`${section}.seoTitle`);
    const description = t(`${section}.seoDescription`);
    const lang = htmlLang(i18n.language);

    useEffect(() => {
        const root = document.documentElement;
        const previousTitle = document.title;
        const previousLang = root.lang;
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;

        document.title = title;
        root.lang = lang;
        document.head.append(meta);

        return () => {
            document.title = previousTitle;
            root.lang = previousLang;
            meta.remove();
        };
    }, [title, description, lang]);
}

export default useToolsMeta;
