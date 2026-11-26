import Link from '../../ui/link';
import { useTranslation } from 'react-i18next';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Hero from '../../ui/hero';
import Illustration from '../../ui/illustration';
import usePageMeta from '../../usePageMeta';
import s from '../../ui/page.module.css';

// v1.2 home (RU master 06.11.2026, KK/EN Q-OGK-ED-05-05=A).
function MainPage() {
    const { t } = useTranslation('mainPage');
    usePageMeta(t('seoTitle'), t('seoDescription'));
    const list = (key) => t(key, { returnObjects: true });

    return (
        <>
            <Header />
            <main className={s.page}>
                <Hero title={t('hero.title')} image="hero-home">
                    <p className={s.lead}>{t('hero.questions')}</p>
                    <p className={s.lead}>{t('hero.intro')}</p>
                    <div className={s.actions}>
                        <Link className={s.btn} to="/open-government">{t('hero.ctaPrimary')}</Link>
                        <Link className={`${s.btn} ${s.secondary}`} to="/community">{t('hero.ctaSecondary')}</Link>
                    </div>
                </Hero>

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
                        <h2>{t('tools.title')}</h2>
                        <p>{t('tools.intro')}</p>
                        <div className={s.grid}>
                            {list('tools.items').map((item) => (
                                <article key={item.title} className={s.card}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                        <Link className={`${s.btn} ${s.secondary} ${s.section_cta}`} to="/tools">{t('tools.cta')}</Link>
                    </div>
                </section>

                <section>
                    <div className={`${s.wrap} ${s.split}`}>
                        <div>
                            <h2>{t('participate.title')}</h2>
                            <p>{t('participate.p1')}</p>
                            <p>{t('participate.p2')}</p>
                            <Link className={`${s.btn} ${s.secondary} ${s.section_cta}`} to="/community">{t('participate.cta')}</Link>
                        </div>
                        <Illustration name="join" />
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('about.title')}</h2>
                        <p>{t('about.text')}</p>
                        <Link className={`${s.btn} ${s.secondary} ${s.section_cta}`} to="/about">{t('about.cta')}</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default MainPage;
