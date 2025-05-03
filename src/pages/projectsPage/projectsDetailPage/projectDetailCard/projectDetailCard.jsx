import styles from "./projectDetailCard.module.css"

function ProjectDetailCard(props) {
    return (
        <div className={styles.card}>
            <img src={props.imgSrc} alt="" />
            <div className={styles.group}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.profession}>{props.profession}</div>
                <div className={styles.group_inner}>
                    <img src="/projectDetailPage_3.svg" alt="" />
                    <img src="/projectDetailPage_4.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailCard