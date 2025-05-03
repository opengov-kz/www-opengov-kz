import { Link } from "react-router-dom";
import styles from "./membersCard1.module.css";
import { useTranslation } from "react-i18next";

function MembersCard1(props) {
    const { t } = useTranslation("membersPage"); // используем namespace, если нужен

    return (
        <div className={styles.card}>
            <img src={props.imgSrc} alt="" />
            <div className={styles.name}>{props.name}</div>
            <div className={styles.profession}>{props.profession}</div>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.tag}>{props.tag}</div>
            <Link to={props.link} className={styles.more}>{t("more")}</Link>
        </div>
    );
}

export default MembersCard1;