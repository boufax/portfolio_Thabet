"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Linkedin, Download } from "lucide-react";
import styles from "./Header.module.css";
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
    const [activeSection, setActiveSection] = useState("");
    const { lang, setLang, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["experience", "projects", "skills", "education", "interests"];
            let current = "";

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Consider the section active if its top is near the middle of the viewport
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                        current = section;
                    }
                }
            });

            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContent}`}>
                <Link href="/" className={styles.logo}>
                    Thabet<span className={styles.accentDot}>.</span>
                </Link>

                <nav className={styles.nav}>
                    <a href="#experience" onClick={(e) => scrollToSection(e, "experience")} className={`${styles.navLink} ${activeSection === "experience" ? styles.active : ""}`}>
                        {t("nav.experience")}
                    </a>
                    <a href="#projects" onClick={(e) => scrollToSection(e, "projects")} className={`${styles.navLink} ${activeSection === "projects" ? styles.active : ""}`}>
                        {t("nav.projects")}
                    </a>
                    <a href="#skills" onClick={(e) => scrollToSection(e, "skills")} className={`${styles.navLink} ${activeSection === "skills" ? styles.active : ""}`}>
                        {t("nav.skills")}
                    </a>
                    <a href="#education" onClick={(e) => scrollToSection(e, "education")} className={`${styles.navLink} ${activeSection === "education" ? styles.active : ""}`}>
                        {t("nav.education")}
                    </a>
                    <a href="#interests" onClick={(e) => scrollToSection(e, "interests")} className={`${styles.navLink} ${activeSection === "interests" ? styles.active : ""}`}>
                        {t("nav.interests")}
                    </a>
                </nav>

                <div className={styles.actions}>
                    <a href={lang === "FR" ? "/portfolio_Thabet/cv/CV_Thabet_FR.pdf" : "/portfolio_Thabet/cv/CV_Thabet_EN.pdf"} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="CV">
                        <Download size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/thabet-bouguerra-48bb94232/" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <button className={styles.langToggle} onClick={() => {
                        setLang(lang === "FR" ? "EN" : "FR");
                        // Also physically update HTML lang attribute (useful for a11y)
                        document.documentElement.lang = lang === "FR" ? "en" : "fr";
                    }}>
                        <span className={lang === "FR" ? styles.activeLang : ""}>FR</span> | <span className={lang === "EN" ? styles.activeLang : ""}>EN</span>
                    </button>
                    <a href="mailto:thabetbouguerra5@gmail.com" className={styles.contactBtn}>
                        Contact
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
