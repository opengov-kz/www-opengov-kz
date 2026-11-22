import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Hero from '../../ui/hero';
import usePageMeta from '../../usePageMeta';
import s from '../../ui/page.module.css';

// /about (RU master 06.11.2026, KK/EN Q-OGK-ED-05-05=A); separate from the legacy /aboutMe page.
// The «Написать нам» email CTA stays off until receipt at info@opengov.kz is verified (ED-03).
function AboutProjectPage() {
    const { t } = useTranslation('aboutProjectPage');
    usePageMeta(t('seoTitle'), t('seoDescription'));
    const list = (key) => t(key, { returnObjects: true });

    return (
        <>
            <Header />
            <main className={s.page}>
                <Hero title={t('hero.title')} image="hero-about" layout="panorama">
                    <p className={s.lead}>{t('hero.p1')}</p>
                    <p className={s.lead}>{t('hero.p2')}</p>
                </Hero>

                {['why', 'now'].map((key) => (
                    <section key={key}>
                        <div className={s.wrap}>
                            <h2>{t(`${key}.title`)}</h2>
                            <p className={s.readable_p}>{t(`${key}.p1`)}</p>
                            <p className={s.readable_p}>{t(`${key}.p2`)}</p>
                        </div>
                    </section>
                ))}

                <section>
                    <div className={s.wrap}>
                        <h2>{t('next.title')}</h2>
                        <ul className={s.readable}>
                            {list('next.items').map((_, i) => (
                                <li key={i}><Trans t={t} i18nKey={`next.items.${i}`} components={{ strong: <strong /> }} /></li>
                            ))}
                        </ul>
                        <p className={s.readable_p}>{t('next.note')}</p>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('principles.title')}</h2>
                        <div className={s.grid}>
                            {list('principles.items').map((item) => (
                                <article key={item.title} className={s.card}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('collaborate.title')}</h2>
                        <p className={s.readable_p}>{t('collaborate.text')}</p>
                        <Link className={`${s.btn} ${s.secondary} ${s.section_cta}`} to="/community">{t('collaborate.cta')}</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default AboutProjectPage;
