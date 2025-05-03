import { useState } from "react";
import styles from "./projectsPage.module.css";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import ProjectsCard1 from "./projectsCard1/projectsCard1";
import projectsData from "../../data/projectsData";
import { useTranslation } from "react-i18next";

function ProjectsPage() {
    const { t, i18n } = useTranslation("projectsPage");
    const lang = i18n.language;

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Фильтрация
    const filteredProjects = projectsData.filter((project) => {
        const title = project.title?.[lang]?.toLowerCase() || "";
        const description = project.description?.[lang]?.toLowerCase() || "";
        const tagKey = project.tagKey;

        const matchesSearch =
            title.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory
            ? selectedCategory === tagKey
            : true;

        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (key) => {
        setSelectedCategory(key);
        setCurrentPage(1);
    };

    const categoryList = ["finance", "ecology", "transport"];

    return (
        <>
            <Header />
            <div className={styles.first_block}>
                <div className={styles.first_block_inner}>
                    <div className={styles.title}>{t("title")}</div>
                    <div className={styles.description}>{t("description1")}</div>
                    <div className={styles.description}>{t("description2")}</div>
                </div>
            </div>

            <div className={styles.second_block}>
                <div className={styles.second_block_inner}>
                    <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                    <div className={styles.filters}>
                        {categoryList.map((key) => (
                            <button
                                key={key}
                                className={styles.filterButton}
                                onClick={() => handleCategoryChange(key)}
                            >
                                {t(`categories.${key}`)}
                            </button>
                        ))}
                        <button
                            className={styles.filterButton}
                            onClick={() => handleCategoryChange("")}
                        >
                            {t("categories.all")}
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.third_block}>
                <div className={styles.third_block_inner}>
                    <div className={styles.cards}>
                        {currentProjects.map((project, index) => (
                            <ProjectsCard1
                                key={index}
                                imgSrc={project.imgSrc}
                                title={project.title[lang]}
                                description={project.description[lang]}
                                date={project.date[lang]}
                                tag={project.tag[lang]}
                                link={project.link}
                            />
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ""}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProjectsPage;