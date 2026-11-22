import Breadcrumbs from './breadcrumbs';
import Illustration from './illustration';
import s from './page.module.css';

// v1.2 first screen: optional breadcrumbs and eyebrow, H1, lead content, decorative art (hidden from assistive tech).
// Opt-in `image` (#38) replaces the art with a Human Civic illustration on a 1fr/1fr grid; other routes are unchanged.
// Opt-in `layout="panorama"` (#42, A2L-S, Q-INT-01=A): H1 | lead row 7fr/5fr above the whole 2:1 scene, used only by
// /community and /about; it has its own classes, so the split Hero of / and the art Hero of other routes keep their styles.
function Hero({ crumbs, eyebrow, title, art, image, layout, children }) {
    if (layout === 'panorama' && image) {
        return (
            <div className={`${s.hero} ${s.hero_panorama}`}>
                <div className={s.wrap}>
                    <div className={s.intro}>
                        <h1>{title}</h1>
                        <div>{children}</div>
                    </div>
                    <Illustration name={image} layout="panorama" priority />
                </div>
            </div>
        );
    }
    return (
        <div className={s.hero}>
            <div className={`${s.wrap} ${s.hero_grid}${image ? ` ${s.split}` : ''}`}>
                <div>
                    {crumbs && <Breadcrumbs items={crumbs} />}
                    {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
                    <h1>{title}</h1>
                    {children}
                </div>
                {image
                    ? <Illustration name={image} priority />
                    : <div className={s.art} aria-hidden="true">{art}</div>}
            </div>
        </div>
    );
}

export default Hero;
