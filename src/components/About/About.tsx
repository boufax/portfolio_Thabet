"use client";
import styles from "./About.module.css";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className={`section ${styles.aboutSection}`}>
            <div className={`container ${styles.container}`}>
                <h2 className={`${styles.sectionTitle} animate-slide-in-left`}>{t("about.title")}</h2>

                <div className={styles.content}>
                    <p className={`${styles.paragraph} animate-fade-in-up delay-100`}>
                        {t("about.p1").split(t("about.p1.highlight"))[0]}
                        <span className={styles.highlight}>{t("about.p1.highlight")}</span>
                        {t("about.p1").split(t("about.p1.highlight"))[1]}
                    </p>
                    <p className={`${styles.paragraph} animate-fade-in-up delay-200`}>
                        {t("about.p2").split(t("about.p2.highlight"))[0]}
                        <span className={styles.highlight}>{t("about.p2.highlight")}</span>
                        {t("about.p2").split(t("about.p2.highlight"))[1]}
                    </p>
                    <p className={`${styles.paragraph} animate-fade-in-up delay-300`}>
                        {t("about.p3").split(t("about.p3.highlight"))[0]}
                        <span className={styles.highlight}>{t("about.p3.highlight")}</span>
                        {t("about.p3").split(t("about.p3.highlight"))[1]}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
