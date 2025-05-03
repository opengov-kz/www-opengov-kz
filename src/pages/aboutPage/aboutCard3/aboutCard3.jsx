import styles from "./aboutCard3.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AboutCard3(props) {
    const { t } = useTranslation("projectsPage");
    return (
        <div className={styles.card}>
            <img src={props.imgSrc} alt="" />
            <div className={styles.group}>
                <div className={styles.tag}>{props.tag}</div>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.description}>{props.description}</div>
                <Link to={props.link} className={styles.more}>{t("more")}</Link>
            </div>

        </div>
    );
}

export default AboutCard3;