"use client";
import { useEffect, useRef } from "react";
import styles from "./Education.module.css";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useLanguage } from "@/context/LanguageContext";

const Education = () => {
    const { t } = useLanguage();

    const educationList = [
        {
            degree: t("education.deg1"),
            school: "EPSI",
            location: "Lyon",
            period: "2024 — 2026",
        },
        {
            degree: t("education.deg2"),
            school: "IUT de Paris – Rives de Seine",
            location: "Paris",
            period: "2021 — 2024",
        },
        {
            degree: t("education.deg3"),
            school: "Lycée Albert Camus",
            location: "Lyon",
            period: "2018 — 2021",
        }
    ];

    const { setElements, visibleEntries } = useIntersectionObserver({ rootMargin: "-10% 0px -10% 0px", threshold: 0.1 });
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setElements(rowRefs.current.filter(Boolean) as Element[]);
        }, 100);
        return () => clearTimeout(timer);
    }, [setElements]);

    return (
        <section id="education" className={`section ${styles.educationSection}`}>
            <div className="container">
                <h2 className={`${styles.sectionTitle} animate-slide-in-left`}>{t("education.title")}</h2>

                <div className={styles.timeline}>
                    {educationList.map((edu, index) => {
                        const isVisible = rowRefs.current[index] ? visibleEntries.has(rowRefs.current[index]!) : false;

                        return (
                            <div
                                key={index}
                                className={`${styles.timelineItem} ${isVisible ? styles.inView : ''}`}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                                ref={(el) => {
                                    rowRefs.current[index] = el;
                                }}
                            >
                                <div className={styles.degreeWrapper}>
                                    <h3 className={styles.degree}>
                                        <span className={styles.degreeText}>{edu.degree}</span>
                                    </h3>
                                </div>
                                <div className={styles.schoolInfo}>
                                    <span className={styles.school}>{edu.school}</span>
                                    <span className={styles.location}> — {edu.location}</span>
                                </div>
                                <div className={styles.periodWrapper}>
                                    <span className={styles.period}>{edu.period}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Education;
