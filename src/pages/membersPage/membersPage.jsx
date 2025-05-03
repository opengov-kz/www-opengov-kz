import { useState } from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import styles from "./membersPage.module.css";
import MembersCard1 from "./membersCard1/membersCard1";
import membersData from "../../data/membersData";
import { useTranslation } from "react-i18next";

function MembersPage() {
    const { t, i18n } = useTranslation("membersPage");
    const lang = i18n.language;

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("all");

    const filteredMembers = membersData.filter((member) => {
        const name = member.name?.[lang]?.toLowerCase() || "";
        const profession = member.profession?.[lang]?.toLowerCase() || "";

        const matchesSearch =
            name.includes(searchQuery.toLowerCase()) ||
            profession.includes(searchQuery.toLowerCase());

        const matchesCategory =
            category === "all" || member.tagKey === category;

        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setCurrentPage(1);
    };

    const categoryList = ["frontend", "data", "research"];

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
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className={styles.filters}>
                        <button
                            className={`${styles.filterButton} ${category === "all" ? styles.active : ""}`}
                            onClick={() => handleCategoryChange("all")}
                        >
                            {t("categories.all")}
                        </button>
                        {categoryList.map((key) => (
                            <button
                                key={key}
                                className={`${styles.filterButton} ${category === key ? styles.active : ""}`}
                                onClick={() => handleCategoryChange(key)}
                            >
                                {t(`categories.${key}`)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.third_block}>
                <div className={styles.third_block_inner}>
                    <div className={styles.cards}>
                        {currentMembers.map((member, index) => (
                            <MembersCard1
                                key={index}
                                imgSrc={member.imgSrc}
                                name={member.name[lang]}
                                profession={member.profession[lang]}
                                description={member.description[lang]}
                                tag={member.tag[lang]}
                                link={member.link}
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

export default MembersPage;
