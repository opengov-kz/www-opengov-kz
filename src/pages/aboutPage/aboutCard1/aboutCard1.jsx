import styles from "./aboutCard1.module.css"

function AboutCard1(props) {
    return (
        <div className={styles.card}>
            <div className={styles.year}>{props.year}</div>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.description}>{props.description}</div>
        </div>
    );
}

export default AboutCard1;