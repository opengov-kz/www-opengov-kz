import styles from "./projectCards.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


function ProjectCards(props) {
    const { t } = useTranslation("newsPage");
    const isCompleted = props.status.toLowerCase() === "завершен";

    // Проверка и безопасное превращение "70%" в число 70
    let progressValue = 0;
    if (props.progress) {
        progressValue = parseInt(props.progress.replace("%", ""), 10);
    }

    return (
        <div className={styles.card}>
            <div className={styles.upperGroup}>
                <img src={props.imgSrc} alt="" />
                <div className={styles.group}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={`${styles.status} ${isCompleted ? styles.statusCompleted : ''}`}>
                        {props.status}
                    </div>
                </div>
            </div>

            <div className={styles.lowerGroup}>
                <div className={styles.description}>{props.description}</div>

                {/* Прогресс-бар */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${progressValue}%` }}
                        ></div>
                    </div>
                    <div className={styles.progressText}>{props.progress}</div>
                </div>

                <Link to={props.link}>
                    <div className={styles.moreProject}>{t("more")}</div>
                </Link>
            </div>
        </div >
    );
}

export default ProjectCards;
