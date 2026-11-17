import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Hero from '../../ui/hero';
import ExternalLink from '../../ui/externalLink';
import usePageMeta from '../../usePageMeta';
import s from '../../ui/page.module.css';

// /open-government, RU/KK/EN Approved 03.11.2026 incl. embedded SEO (Q-OGK-CKM-12-SEO-01=A). The §8 editors' note
// on confirming a contact channel is not reader text and is not rendered (as in prototype v1.2).
const ELEMENT_ROUTES = ['/tools/open-data', '/tools/open-budgets', '/tools/legal-acts'];
const SOURCES = ['https://www.opengovpartnership.org/', 'https://www.oecd.org/', 'https://sdgs.un.org/goals/goal16'];

function OpenGovernmentPage() {
    const { t } = useTranslation('openGovernmentPage');
    const { t: th } = useTranslation('header');
    usePageMeta(t('seoTitle'), t('seoDescription'));
    const list = (key) => t(key, { returnObjects: true });
    const rich = (key) => <Trans t={t} i18nKey={key} components={{ strong: <strong /> }} />;

    return (
        <>
            <Header />
            <main className={s.page}>
                <Hero
                    crumbs={[{ to: '/', label: th('home') }, { to: '/open-government', label: th('openGovernment') }]}
                    eyebrow={t('hero.eyebrow')}
                    title={t('hero.title')}
                    art="◈"
                >
                    <p className={s.lead}><strong>{t('hero.definition')}</strong></p>
                    <p className={s.lead}>{t('hero.text')}</p>
                    <div className={s.actions}>
                        <Link className={s.btn} to="/tools">{t('hero.cta')}</Link>
                    </div>
                </Hero>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('comparison.title')}</h2>
                        <div className={`${s.grid} ${s.two}`}>
                            {['before', 'after'].map((key) => (
                                <article key={key} className={s.card}>
                                    <h3>{t(`comparison.${key}.title`)}</h3>
                                    <ol className={s.steps}>
                                        {list(`comparison.${key}.steps`).map((_, i) => (
                                            <li key={i}>{rich(`comparison.${key}.steps.${i}`)}</li>
                                        ))}
                                    </ol>
                                </article>
                            ))}
                        </div>
                        <p className={`${s.notice} ${s.section_note}`}>{rich('comparison.note')}</p>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('principles.title')}</h2>
                        <div className={s.grid}>
                            {list('principles.items').map((item, i) => (
                                <article key={item.title} className={s.card}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                    <p>{rich(`principles.items.${i}.example`)}</p>
                                </article>
                            ))}
                        </div>
                        <p className={s.section_note}>{rich('principles.summary')}</p>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('practice.title')}</h2>
                        <p className={s.readable_p}>{t('practice.p1')}</p>
                        <p className={s.readable_p}>{rich('practice.p2')}</p>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('elements.title')}</h2>
                        <div className={s.grid}>
                            {list('elements.items').map((item, i) => (
                                <article key={item.title} className={s.card}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                    {ELEMENT_ROUTES[i] && (
                                        <Link className={`${s.btn} ${s.secondary}`} to={ELEMENT_ROUTES[i]}>{item.cta}</Link>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('audiences.title')}</h2>
                        <div className={s.grid}>
                            {list('audiences.items').map((item, i) => (
                                <article key={item.title} className={s.card}>
                                    <h3>{item.title}</h3>
                                    {item.points.map((_, j) => (
                                        <p key={j}>{rich(`audiences.items.${i}.points.${j}`)}</p>
                                    ))}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('international.title')}</h2>
                        <p className={s.readable_p}>{rich('international.p1')}</p>
                        <p className={s.readable_p}>{rich('international.p2')}</p>
                        <p className={s.readable_p}>
                            {t('international.sourcesLabel')}{' '}
                            {list('international.sources').map((label, i) => (
                                <Fragment key={SOURCES[i]}>
                                    {i > 0 && ', '}
                                    <ExternalLink className={s.inline_link} href={SOURCES[i]}>{label}</ExternalLink>
                                </Fragment>
                            ))}
                            .
                        </p>
                    </div>
                </section>

                <section>
                    <div className={s.wrap}>
                        <h2>{t('kazakhstan.title')}</h2>
                        <p className={s.readable_p}>{t('kazakhstan.text')}</p>
                        <Link className={`${s.btn} ${s.section_cta}`} to="/tools">{t('kazakhstan.cta')}</Link>
                        <div className={`${s.grid} ${s.two} ${s.next_steps}`}>
                            <div>
                                <p>{t('kazakhstan.aboutQuestion')}</p>
                                <Link className={`${s.btn} ${s.secondary}`} to="/about">{t('kazakhstan.aboutCta')}</Link>
                            </div>
                            <div>
                                <p>{t('kazakhstan.communityQuestion')}</p>
                                <Link className={`${s.btn} ${s.secondary}`} to="/community">{t('kazakhstan.communityCta')}</Link>
                            </div>
                        </div>
                        <p className={s.section_note}><em>{t('kazakhstan.disclaimer')}</em></p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default OpenGovernmentPage;
