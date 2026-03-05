"use client";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
    const [offsetY, setOffsetY] = useState(0);
    const { t, lang } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className={`section ${styles.hero}`}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={`${styles.title} animate-blur-in`}>
                        Thabet Bouguerra
                    </h1>
                    <div className={`${styles.titleUnderline} animate-scale-up delay-200`}></div>

                    <h2 className={`${styles.role} animate-fade-in-up delay-300`}>
                        {t("hero.role")}
                    </h2>

                    <div className={`${styles.positioningContainer} delay-500`}>
                        <p className={`${styles.subtitle} animate-typing`}>
                            {t("hero.subtitle")}
                        </p>
                    </div>

                    <div className={`${styles.actions} animate-fade-in-up delay-800`}>
                        <a href="mailto:thabetbouguerra5@gmail.com" className={styles.primaryBtn}>
                            {t("hero.contact")}
                        </a>
                        <a href={lang === "FR" ? "/portfolio_Thabet/cv/CV_Thabet_FR.pdf" : "/portfolio_Thabet/cv/CV_Thabet_EN.pdf"} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                            {t("hero.cv")}
                        </a>
                        <a href="#projects" className={styles.secondaryBtn}>
                            {t("hero.projects")}
                        </a>
                    </div>
                </div>

                <div
                    className={`${styles.visual} animate-scale-up delay-500`}
                    style={{ transform: `translateY(${offsetY * 0.15}px)` }}
                >
                    <div className={styles.circle}></div>
                    <div className={styles.circleSmall}></div>
                </div>
            </div>

            <div className={`${styles.scrollIndicator} animate-fade-in-up delay-1000`}>
                <div className={styles.scrollArrow}>↓</div>
            </div>
        </section>
    );
};

export default Hero;
