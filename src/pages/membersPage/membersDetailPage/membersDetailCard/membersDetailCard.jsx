import { Link } from "react-router-dom";
import styles from "./membersDetailCard.module.css"

function MembersDetailCard(props) {
    return (
        <div className={styles.card}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.description}>{props.description}</div>
            <Link to={props.link}>
            <div className={styles.more}>Подробнее</div>
            </Link>
        </div>
    );
}

export default MembersDetailCard