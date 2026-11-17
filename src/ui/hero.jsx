import Breadcrumbs from './breadcrumbs';
import s from './page.module.css';

// v1.2 first screen: optional breadcrumbs and eyebrow, H1, lead content, decorative art (hidden from assistive tech).
function Hero({ crumbs, eyebrow, title, art, children }) {
    return (
        <div className={s.hero}>
            <div className={`${s.wrap} ${s.hero_grid}`}>
                <div>
                    {crumbs && <Breadcrumbs items={crumbs} />}
                    {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
                    <h1>{title}</h1>
                    {children}
                </div>
                <div className={s.art} aria-hidden="true">{art}</div>
            </div>
        </div>
    );
}

export default Hero;
