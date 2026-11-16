import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Очистка возвращает значения index.html; <html lang> синхронизирует src/i18n.js.
function useToolsMeta(section) {
    const { t } = useTranslation("toolsPage");
    const title = t(`${section}.seoTitle`);
    const description = t(`${section}.seoDescription`);

    useEffect(() => {
        const previousTitle = document.title;
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;

        document.title = title;
        document.head.append(meta);

        return () => {
            document.title = previousTitle;
            meta.remove();
        };
    }, [title, description]);
}

export default useToolsMeta;
