"use client";
import styles from "./Experience.module.css";
import { useLanguage } from "@/context/LanguageContext";

const Experience = () => {
    const { t, lang } = useLanguage();

    const experiencesFR = [
        {
            role: "Data Analyst",
            company: "Renault Trucks",
            location: "Lyon, France",
            period: "Septembre 2024 à septembre 2026 (2 ans)",
            description: "Analyse stratégique du marché des véhicules lourds et utilitaires pour évaluer la performance concurrentielle. Développement et ciblage de modèles prédictifs (Machine Learning) pour la segmentation client et l'optimisation des stratégies de pricing. Conception d'un tableau de bord décisionnel Power BI orienté KPI pour piloter la performance commerciale de Renault Trucks France, en croisant de multiples sources expertes internes et externes."
        },
        {
            role: "Data Analyst",
            company: "La Poste Groupe",
            location: "Paris",
            period: "Septembre 2022 à septembre 2024 (2 ans)",
            description: "Centralisation et agrégation de la base de données client BtoC multisources. Exploitation des requêtes SQL et Dataiku pour extraire des insights de qualité. Pilotage de la performance via un reporting dynamique Power BI orienté 'Expérience Client'. Analyse comportementale avancée permettant d'identifier les tendances sous-jacentes et d'orienter les décisions stratégiques du groupe."
        }
    ];

    const experiencesEN = [
        {
            role: "Data Analyst",
            company: "Renault Trucks",
            location: "Lyon, France",
            period: "September 2024 to September 2026 (2 years)",
            description: "Strategic analysis of the heavy and commercial vehicle market to evaluate competitive performance. Development and targeting of predictive models (Machine Learning) for customer segmentation and pricing strategy optimization. Design of a KPI-oriented Power BI decision dashboard to steer Renault Trucks France's commercial performance, crossing multiple internal and external expert sources."
        },
        {
            role: "Data Analyst",
            company: "La Poste Groupe",
            location: "Paris, France",
            period: "September 2022 to September 2024 (2 years)",
            description: "Centralization and aggregation of the multi-source BtoC customer database. Exploitation of SQL queries and Dataiku to extract qualitative insights. Performance management via dynamic 'Customer Experience' oriented Power BI reporting. Advanced behavioral analysis to identify underlying trends and guide the group's strategic decisions."
        }
    ];

    const experiences = lang === "FR" ? experiencesFR : experiencesEN;

    return (
        <section id="experience" className={`section ${styles.experienceSection}`}>
            <div className="container">
                <h2 className={`${styles.sectionTitle} animate-slide-in-left`}>{t("experience.title")}</h2>

                <div className={styles.timeline}>
                    <div className={styles.verticalLine}></div>
                    {experiences.map((exp, index) => (
                        <div key={index} className={`${styles.timelineItem} animate-slide-in-right delay-${(index + 1) * 200}`}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <div className={styles.header}>
                                    <div>
                                        <h3 className={styles.role}>{exp.role}</h3>
                                        <p className={styles.company}>{exp.company} <span className={styles.location}>— {exp.location}</span></p>
                                    </div>
                                    <span className={styles.period}>{exp.period}</span>
                                </div>
                                <p className={styles.description}>
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
