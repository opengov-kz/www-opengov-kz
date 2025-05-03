import { Link } from "react-router-dom";
import styles from "./projectDetailCard2.module.css"

function ProjectDetailCard2(props) {
    return (
        <Link to={props.link}>
            <div className={styles.card}>
                <img src={props.imgSrc} alt="" />
                <div className={styles.group}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.description}>{props.description}</div>
                </div>
            </div>
        </Link>
    );
}

export default ProjectDetailCard2