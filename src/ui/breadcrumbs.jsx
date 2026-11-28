import Link from './link';
import { useTranslation } from 'react-i18next';
import styles from './breadcrumbs.module.css';

// items: [{ to, label }]; the last item is the current page and is not a link.
function Breadcrumbs({ items }) {
    const { t } = useTranslation('header');
    const last = items.length - 1;

    return (
        <nav aria-label={t('breadcrumbLabel')} className={styles.crumbs}>
            <ol>
                {items.map(({ to, label }, i) => (
                    <li key={to}>
                        {i === last ? <span aria-current="page">{label}</span> : <Link to={to}>{label}</Link>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
