import styles from "./aboutCard2.module.css"
import { useTranslation } from "react-i18next";

function AboutCard2(props) {
    const { t } = useTranslation("projectsPage");
    return (
        <div className={styles.card}>
            <img src={props.imgSrc} alt="" />
            <div className={styles.title}>{props.title}</div>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.more}>{t("more")}</div>
        </div>
    );
}

export default AboutCard2;