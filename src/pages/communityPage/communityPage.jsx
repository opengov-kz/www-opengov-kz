import { Trans, useTranslation } from 'react-i18next';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Hero from '../../ui/hero';
import usePageMeta from '../../usePageMeta';
import s from '../../ui/page.module.css';

// /community (RU master 06.11.2026, KK/EN Q-OGK-ED-05-05=A). The «Написать нам» email CTA stays off until
// receipt at info@opengov.kz is verified (ED-03).
function CommunityPage() {
    const { t } = useTranslation('communityPage');
    usePageMeta(t('seoTitle'), t('seoDescription'));
    const list = (key) => t(key, { returnObjects: true });
    const strong = { strong: <strong /> };

    return (
        <>
            <Header />
            <main className={s.page}>
                <Hero title={t('hero.title')} image="hero-community">
                    <p className={s.lead}>{t('hero.p1')}</p>
                    <p className={s.lead}>{t('hero.p2')}</p>
                </Hero>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('why.title')}</h2>
                        <p className={s.readable_p}>{t('why.p1')}</p>
                        <p className={s.readable_p}>{t('why.p2')}</p>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('audiences.title')}</h2>
                        <ul className={s.readable}>
                            {list('audiences.items').map((_, i) => (
                                <li key={i}><Trans t={t} i18nKey={`audiences.items.${i}`} components={strong} /></li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('areas.title')}</h2>
                        <div className={s.grid}>
                            {list('areas.items').map((item) => (
                                <article key={item.title} className={s.card}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                        <p>{t('areas.note')}</p>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('start.title')}</h2>
                        <p className={s.readable_p}>{t('start.p1')}</p>
                        <p className={s.readable_p}>{t('start.p2')}</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default CommunityPage;
