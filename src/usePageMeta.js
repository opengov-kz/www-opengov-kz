import { useEffect } from "react";

// Per-route <title> and meta description; cleanup restores index.html values. <html lang> is synced in src/i18n.js.
function usePageMeta(title, description) {
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

export default usePageMeta;
