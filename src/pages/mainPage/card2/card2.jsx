import styles from "./card2.module.css";

function Card2(props) {
    return (
        <div className={styles.card}>
            <img src={props.imgSrc} alt="" />
            <div className={styles.group}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.description}>{props.description}</div>
            </div>
        </div>
    );
}

export default Card2