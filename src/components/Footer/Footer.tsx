"use client";
import styles from "./Footer.module.css";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContent}`}>
                <div className={styles.info}>
                    <h3 className={styles.name}>Thabet Bouguerra</h3>
                    <p className={styles.role}>Data Analyst</p>
                    <a href="mailto:thabetbouguerra5@gmail.com" className={styles.contact}>
                        thabetbouguerra5@gmail.com
                    </a>
                </div>

                <div className={styles.links}>
                    <a
                        href="https://www.linkedin.com/in/thabet-bouguerra-48bb94232/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
            <div className={`container ${styles.bottom}`}>
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} Thabet Bouguerra. {t("footer.rights")}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
