import { Link } from "react-router-dom";
import styles from "./projectsCard1.module.css";
import { useTranslation } from "react-i18next";

function ProjectsCard1(props) {
    const { t } = useTranslation("projectsPage");

    return (
        <div className={styles.card}>
            <img src={props.imgSrc} alt="" />
            <div className={styles.group}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.secondGroup}>
                    <div className={styles.date}>
                        <img src="/public/mp_Card8.svg" alt="" />
                        {props.date}
                    </div>
                </div>
                <div className={styles.tag}>{props.tag}</div>
                <Link to={props.link}>
                    <div className={styles.more}>{t("more")}</div>
                </Link>
            </div>
        </div>
    );
}

export default ProjectsCard1;