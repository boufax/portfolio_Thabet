"use client";
import { Globe, Trophy, Waves } from "lucide-react";
import styles from "./Interests.module.css";
import { useLanguage } from "@/context/LanguageContext";

const Interests = () => {
    const { t } = useLanguage();

    const interestsList = [
        {
            title: t("interests.travel"),
            icon: <Globe size={24} />,
            description: t("interests.travelDesc")
        },
        {
            title: t("interests.football"),
            icon: <Trophy size={24} />,
            description: t("interests.footballDesc")
        },
        {
            title: t("interests.swimming"),
            icon: <Waves size={24} />,
            description: t("interests.swimmingDesc")
        }
    ];

    return (
        <section id="interests" className={`section ${styles.interestsSection}`}>
            <div className="container">
                <h2 className={`${styles.sectionTitle} animate-slide-in-up`}>{t("interests.title")}</h2>

                <div className={styles.grid}>
                    {interestsList.map((interest, idx) => (
                        <div key={idx} className={`${styles.card} animate-fade-in-up delay-${(idx + 1) * 200}`}>
                            <div className={styles.icon}>{interest.icon}</div>
                            <h3 className={styles.title}>{interest.title}</h3>
                            <p className={styles.description}>{interest.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Interests;
