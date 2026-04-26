"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "FR" | "EN";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    FR: {
        "nav.experience": "Expérience",
        "nav.projects": "Projets",
        "nav.skills": "Compétences",
        "nav.education": "Formation",
        "nav.interests": "Centre d'intérêt",
        "hero.role": "Analytics Engineer / Diplômé en Ingénierie de données",
        "hero.subtitle": "Transformer la donnée complexe en décisions stratégiques.",
        "hero.contact": "Me contacter",
        "hero.cv": "Télécharger mon CV",
        "hero.projects": "Voir mes projets",
        "about.title": "À propos",
        "about.p1": "Ma vision de la data repose sur un principe simple : structurer, analyser et exploiter la donnée pour générer de la valeur.",
        "about.p1.highlight": "générer de la valeur",
        "about.p2": "Je travaille à l'intersection de l'ingénierie de données, de l'analyse et du métier afin de transformer des données complexes en insights exploitables et décisions stratégiques.",
        "about.p2.highlight": "décisions stratégiques",
        "about.p3": "Animé par une forte ambition internationale, je recherche une mission en VIE ou un CDI au sein d'un grand groupe pour contribuer à des projets data à grande échelle.",
        "about.p3.highlight": "projets data à grande échelle",
        "skills.title": "Compétences",
        "skills.cat1": "Analyse de données",
        "skills.cat2": "Machine Learning",
        "skills.cat3": "Ingénierie Data",
        "skills.cat4": "Cloud & Environnements",
        "experience.title": "Expérience",
        "projects.title": "Projets",
        "education.title": "Formation",
        "education.deg1": "MSc Expert en Ingénierie de données",
        "education.deg2": "BUT Sciences des données (STID)",
        "education.deg3": "Baccalauréat Spécialité Math. et Physique-Chimie",
        "interests.title": "Centres d'Intérêt",
        "interests.travel": "Voyages",
        "interests.travelDesc": "Découverte de nouvelles cultures, curiosité pour différents modes de vie et ouverture à l'international. Les voyages nourrissent ma capacité d'adaptation et mon intérêt pour les environnements multiculturels.",
        "interests.football": "Football",
        "interests.footballDesc": "Coach et éducateur d’une équipe U15. Transmission des valeurs du sport, gestion d’un groupe de jeunes joueurs et développement de l’esprit d’équipe. Cette expérience développe mes compétences en leadership, communication et pédagogie.",
        "interests.swimming": "Natation",
        "interests.swimmingDesc": "Pratique régulière de la natation, discipline qui développe la rigueur, l’endurance et la persévérance.",
        "footer.rights": "Tous droits réservés.",
    },
    EN: {
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.skills": "Skills",
        "nav.education": "Education",
        "nav.interests": "Interests",
        "hero.role": "Analytics Engineer / Data Engineering Graduate",
        "hero.subtitle": "Transforming complex data into strategic decisions.",
        "hero.contact": "Contact Me",
        "hero.cv": "Download Resume",
        "hero.projects": "View My Projects",
        "about.title": "About Me",
        "about.p1": "My vision of data is based on a simple principle: structuring, analyzing, and leveraging data to generate value.",
        "about.p1.highlight": "generate value",
        "about.p2": "I work at the intersection of data engineering, analytics, and business to transform complex raw data into actionable insights and strategic decisions.",
        "about.p2.highlight": "strategic decisions",
        "about.p3": "Driven by a strong international ambition, I am looking for a VIE mission or a permanent position within a major group to contribute to large-scale data projects.",
        "about.p3.highlight": "large-scale data projects",
        "skills.title": "Skills",
        "skills.cat1": "Data Analysis",
        "skills.cat2": "Machine Learning",
        "skills.cat3": "Data Engineering",
        "skills.cat4": "Cloud & Environments",
        "experience.title": "Experience",
        "projects.title": "Projects",
        "education.title": "Education",
        "education.deg1": "MSc Expert in Data Engineering",
        "education.deg2": "Bachelor in Data Science (STID)",
        "education.deg3": "High School Diploma majoring in Math & Physics",
        "interests.title": "Interests",
        "interests.travel": "Travel",
        "interests.travelDesc": "Discovering new cultures, curiosity for different lifestyles, and international openness. Traveling fuels my adaptability and interest in multicultural environments.",
        "interests.football": "Football",
        "interests.footballDesc": "Coach and educator of an Under-15 team. Transmitting sports values, managing a group of young players, and developing team spirit. This experience enhances my leadership, communication, and teaching skills.",
        "interests.swimming": "Swimming",
        "interests.swimmingDesc": "Regular swimming practice, a discipline that develops rigor, endurance, and perseverance.",
        "footer.rights": "All rights reserved.",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>("FR");

    const t = (key: string): string => {
        // @ts-ignore
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
