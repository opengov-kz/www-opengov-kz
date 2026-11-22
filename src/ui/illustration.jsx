import s from './page.module.css';

// Human Civic illustrations (Asset Package v1.0, #38), decorative, natural aspect ratio, no crop.
// community/about switch to their own mobile compositions at 560px (F-06=B). 1600w files are derived from the
// native 1774px PNGs without upscaling; hero-home is 1536px native, so it stops at 1200w.
const set = (file, widths) => widths.map((w) => `/illustrations/${file}-${w}w.webp ${w}w`).join(', ');
const FULL = [768, 1200, 1600];
const ITEMS = {
    'hero-home': { file: 'hero-home-desktop', desktop: set('hero-home-desktop', [768, 1200]), width: 1200, height: 800 },
    'hero-community': {
        file: 'hero-community-desktop', desktop: set('hero-community-desktop', FULL),
        mobile: set('hero-community-mobile', FULL), width: 1200, height: 600,
    },
    'hero-about': {
        file: 'hero-about-desktop', desktop: set('hero-about-desktop', FULL),
        mobile: set('hero-about-mobile', FULL), width: 1200, height: 600,
    },
    join: { file: 'join-desktop', desktop: set('join-desktop', FULL), width: 1200, height: 600 },
};
// Rendered width: full column up to 800px (16px/24px gutters), then half of the 1160px wrap (1fr/1fr, 30px gap).
const SIZES = '(max-width: 560px) calc(100vw - 32px), (max-width: 800px) calc(100vw - 48px), '
    + '(max-width: 1160px) calc(50vw - 39px), 541px';
// Panorama (#42, A2L-S): full-bleed scene up to 560px, content width up to 1008px, then capped at 960px.
const PANORAMA_SIZES = '(max-width: 560px) 100vw, (max-width: 1008px) calc(100vw - 48px), 960px';

function Illustration({ name, priority = false, layout }) {
    const it = ITEMS[name];
    const panorama = layout === 'panorama';
    const sizes = panorama ? PANORAMA_SIZES : SIZES;
    return (
        <picture className={panorama ? s.panorama : s.illustration}>
            {it.mobile && (
                <source media="(max-width: 560px)" sizes={sizes} srcSet={it.mobile} width={it.width} height={it.height} />
            )}
            <img
                sizes={sizes}
                srcSet={it.desktop}
                src={`/illustrations/${it.file}-1200w.webp`}
                width={it.width}
                height={it.height}
                alt=""
                decoding="async"
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : undefined}
            />
        </picture>
    );
}

export default Illustration;
