import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO_SELECTOR, headTags, matchUrl } from "./routing";

// Per-route <title>, meta description and, on prerendered URLs (#44), canonical/hreflang or robots noindex.
// The tags already in <head> (prerendered HTML or the previous route) are replaced, never duplicated.
// <html lang> is synced in src/i18n.js and src/App.jsx.
function usePageMeta(title, description) {
    const { pathname } = useLocation();

    useEffect(() => {
        const route = matchUrl(pathname);
        const tags = [["meta", { name: "description", content: description }], ...(route ? headTags(route) : [])];

        document.title = title;
        document.head.querySelectorAll(SEO_SELECTOR).forEach((el) => el.remove());
        const added = tags.map(([tag, attrs]) => {
            const el = document.createElement(tag);
            for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
            return document.head.appendChild(el);
        });

        return () => added.forEach((el) => el.remove());
    }, [title, description, pathname]);
}

export default usePageMeta;
