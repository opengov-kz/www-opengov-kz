import { useTranslation } from "react-i18next";
import usePageMeta from "../../usePageMeta";

function useToolsMeta(section) {
    const { t } = useTranslation("toolsPage");
    usePageMeta(t(`${section}.seoTitle`), t(`${section}.seoDescription`));
}

export default useToolsMeta;
