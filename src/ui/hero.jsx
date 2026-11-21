import Breadcrumbs from './breadcrumbs';
import Illustration from './illustration';
import s from './page.module.css';

// v1.2 first screen: optional breadcrumbs and eyebrow, H1, lead content, decorative art (hidden from assistive tech).
// Opt-in `image` (#38) replaces the art with a Human Civic illustration on a 1fr/1fr grid; other routes are unchanged.
function Hero({ crumbs, eyebrow, title, art, image, children }) {
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
