import styles from "./card.module.css";

function Card(props) {
    return (
        <div className={styles.card}>
            <div className={styles.card_inner}>
                <img src={props.imgSrc} alt="" />
                <div className={styles.title}>{props.title}</div>
                <div className={styles.description}>{props.description}</div>
            </div>
        </div>
    );
}

export default Card