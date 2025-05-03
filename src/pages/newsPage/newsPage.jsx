import React, { useState } from "react";
import styles from "./newsPage.module.css";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import NewsCard1 from "./newsCard1/newsCard1";
import newsData from "../../data/newsData";
import { useTranslation } from "react-i18next";

function NewsPage() {
    const { t, i18n } = useTranslation("newsPage");
    const lang = i18n.language || "ru"; // fallback

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const newsPerPage = 6;

    const filteredNews = newsData.filter((news) => {
        const title = news.title?.[lang]?.toLowerCase() || "";
        const description = news.description?.[lang]?.toLowerCase() || "";
        const tagKey = news.tagKey;

        const matchesSearch =
            title.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory
            ? selectedCategory === tagKey
            : true;

        return matchesSearch && matchesCategory;
    });

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(filteredNews.length / newsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (key) => {
        setSelectedCategory(key);
        setCurrentPage(1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const categoryList = [
        "technology",
        "law",
        "education",
        "blockchain",
        "society",
        "business"
    ];

    return (
        <>
            <Header />
            <div className={styles.first_block}>
                <div className={styles.first_block_inner}>
                    <div className={styles.title}>{t("title")}</div>
                    <div className={styles.description}>{t("description")}</div>
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
                        {currentNews.map((news, index) => (
                            <NewsCard1
                                key={index}
                                imgSrc={news.imgSrc}
                                title={news.title?.[lang] || ""}
                                description={news.description?.[lang] || ""}
                                date={news.date?.[lang] || ""}
                                author={news.author?.[lang] || ""}
                                tag={news.tag?.[lang] || ""}
                                link={news.link}
                            />
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={styles.pageButton}
                                onClick={() => handlePageClick(index + 1)}
                                style={{
                                    backgroundColor: currentPage === index + 1 ? "#1A56DB" : "#EFF6FF",
                                    color: currentPage === index + 1 ? "white" : "#1A56DB",
                                    fontWeight: "bold",
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NewsPage;
