import { Link } from "react-router-dom";
import styles from "./newsDetailCard.module.css"

function NewsDetailCard(props) {
    return (
        <Link to={props.link}>
            <div className={styles.card}>
                <img src={props.imgSrc} alt="" />
                <div className={styles.title}>{props.title}</div>
                <div className={styles.date}>{props.date}</div>
            </div>
        </Link>
    );
}

export default NewsDetailCard