"use client";
import { BarChart, Brain, Database, Cloud } from "lucide-react";
import styles from "./Skills.module.css";
import { useLanguage } from "@/context/LanguageContext";

const Skills = () => {
    const { t } = useLanguage();

    const categories = [
        {
            title: t("skills.cat1"),
            icon: <BarChart size={24} />,
            skills: ["SQL", "Python", "Power BI", "Tableau", "Excel"]
        },
        {
            title: t("skills.cat2"),
            icon: <Brain size={24} />,
            skills: ["Scikit-learn", "XGBoost", "Feature Engineering", "Clustering", "Supervised Learning"]
        },
        {
            title: t("skills.cat3"),
            icon: <Database size={24} />,
            skills: ["PySpark", "ETL / ELT", "Data Modeling", "Databricks", "Data Pipelines"]
        },
        {
            title: t("skills.cat4"),
            icon: <Cloud size={24} />,
            skills: ["AWS", "Databricks", "Docker"]
        }
    ];

    return (
        <section id="skills" className={`section ${styles.skillsSection}`}>
            <div className="container">
                <h2 className={`${styles.sectionTitle} animate-slide-in-right`}>{t("skills.title")}</h2>

                <div className={styles.grid}>
                    {categories.map((category, idx) => (
                        <div key={idx} className={`${styles.categoryCard} animate-fade-in-up delay-${(idx + 1) * 200}`}>
                            <div className={styles.cardHeader}>
                                <span className={styles.icon}>{category.icon}</span>
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                            </div>

                            <div className={styles.techTagsContainer}>
                                {category.skills.map((skill, i) => (
                                    <span key={i} className={styles.techTag}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
