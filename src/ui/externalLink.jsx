import { useTranslation } from 'react-i18next';

// Visible ↗ marker; screen readers hear "(external site)" in the current language instead.
function ExternalLink({ href, children, className }) {
    const { t } = useTranslation('header');
    return (
        <a className={className} href={href} rel="noopener">
            {children}
            <span aria-hidden="true"> ↗</span>
            <span style={HIDDEN}> {t('externalSite')}</span>
        </a>
    );
}

const HIDDEN = {
    position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap',
};

export default ExternalLink;
