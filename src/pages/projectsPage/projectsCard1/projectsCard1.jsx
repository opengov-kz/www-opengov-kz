import styles from "./projectsCard1.module.css";

// "Подробнее" removed by Q-OGK-MVP-RB-06=B (#28): /projectDetail no longer exists.
function ProjectsCard1(props) {
    return (
        <div className={styles.card}>
            <img src={props.imgSrc} alt="" />
            <div className={styles.group}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.secondGroup}>
                    <div className={styles.date}>
                        <img src="/mp_Card8.svg" alt="" />
                        {props.date}
                    </div>
                </div>
                <div className={styles.tag}>{props.tag}</div>
            </div>
        </div>
    );
}

export default ProjectsCard1;
