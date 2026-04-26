"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIntersectionObserver as useScrollReveal } from "@/hooks/useIntersectionObserver";
import { LineChart, Brain, CircleDollarSign, LayoutDashboard, Database, GitBranch, TrendingUp, Cloud } from "lucide-react";
import styles from "./Projects.module.css";

// --- Custom Hooks ---
const useIntersectionObserver = (options = {}) => {
    const [elements, setElements] = useState<Element[]>([]);
    const [visibleEntries, setVisibleEntries] = useState<IntersectionObserverEntry[]>([]);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            setVisibleEntries((prev) => {
                const updated = [...prev];
                entries.forEach(entry => {
                    const index = updated.findIndex(e => e.target === entry.target);
                    if (index > -1) {
                        updated[index] = entry;
                    } else {
                        updated.push(entry);
                    }
                });
                return updated;
            });
        }, options);

        elements.forEach((el) => {
            if (el) observer.current?.observe(el);
        });

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [elements, options]);

    return { setElements, visibleEntries };
};

// --- Data ---
type ProjectCategory = "Analyse" | "Machine Learning" | "Business Intelligence" | "Ingénierie Data";

type Project = {
    id: string;
    icon: React.ElementType;
    title: string;
    shortDesc: string;
    context: string;
    process: string;
    result: string;
    techs: string[];
    category: ProjectCategory;
};

const projectsFR: Project[] = [
    {
        id: "p1",
        icon: LineChart,
        title: "Analyse concurrentielle & parts de marché",
        shortDesc: "Vision stratégique du positionnement face à la concurrence.",
        context: "Dans un marché fortement concurrentiel, il était essentiel de disposer d'une vision claire du positionnement de la marque face aux principaux acteurs du secteur. La direction manquait d'indicateurs standardisés pour comparer objectivement les performances.",
        process: "Consolidation des données internes et externes en une source unique de vérité. Création d'un modèle d'analyse des parts de marché par segment géographique et par type de produit. Étude approfondie des dynamiques concurrentielles et des tendances macroéconomiques.",
        result: "Restitution d'une vision stratégique consolidée permettant d'identifier immédiatement les opportunités de développement commercial et d'adapter le plan d'action marketing.",
        techs: ["Analytics", "Python", "SQL", "Excel"],
        category: "Analyse"
    },
    {
        id: "p2",
        icon: Brain,
        title: "Segmentation client & modélisation",
        shortDesc: "Amélioration de la compréhension des comportements clients.",
        context: "Afin de personnaliser l'approche commerciale et d'optimiser le ROI des campagnes marketing, l'entreprise avait besoin de dépasser la segmentation arbitraire basée sur des critères simples et de comprendre les véritables comportements d'achat.",
        process: "Extraction, nettoyage et préparation des données transactionnelles. Phase de feature engineering pour synthétiser les comportements récents, la fréquence et la valeur. Développement et évaluation de modèles de clustering (K-Means) pour créer des profils homogènes.",
        result: "Identifier des groupes clients actionnables présentant des potentiels de valeur distincts, permettant aux équipes marketing de déployer des campagnes ultra-ciblées.",
        techs: ["Machine Learning", "Python", "XGBoost", "K-Means"],
        category: "Machine Learning"
    },
    {
        id: "p3",
        icon: CircleDollarSign,
        title: "Optimisation des stratégies de pricing",
        shortDesc: "Alignement de la compétitivité et de la rentabilité.",
        context: "La volatilité des prix du marché exigéait une stratégie de tarification plus agile. Le défi était de trouver le point d'équilibre optimal entre le maintien des marges et la compétitivité des offres commerciales sur le segment B2B.",
        process: "Création d'outils analytiques modélisant l'élasticité prix historique. Intégration de sources de données concurrentielles pour un benchmarking en temps réel. Simulation de différents scénarios de marge et de volume pour éclairer la direction.",
        result: "Fournir un cadre d'aide à la décision mathématique et objectif, permettant aux responsables commerciaux d'argumenter leurs tarifications avec des données tangibles.",
        techs: ["Machine Learning", "Simulation"],
        category: "Machine Learning"
    },
    {
        id: "p4",
        icon: LayoutDashboard,
        title: "Conception de dashboards exécutifs",
        shortDesc: "Pilotage dynamique de la performance par les équipes métiers.",
        context: "Les équipes dirigeantes utilisaient des dizaines de rapports statiques dispersés, ralentissant considérablement le suivi des performances hebdomadaires et mensuelles de l'entreprise.",
        process: "Collaboration avec les parties prenantes pour définir une pyramide de KPI pertinents. Structuration d'un modèle de données en étoile robuste (Data Modeling). Création de visualisations Power BI interactives, claires et centrées sur l'action avec DAX.",
        result: "Centralisation du pilotage stratégique via un outil unique, accélérant fortement les prises de décision lors des comités de direction et instaurant une véritable culture data.",
        techs: ["BI", "Power BI", "DAX", "Data Modeling"],
        category: "Business Intelligence"
    },
    {
        id: "p5",
        icon: Database,
        title: "Centralisation des données clients",
        shortDesc: "Création d'une base consolidée pour des analyses fiables.",
        context: "Les données d'interaction client étaient silotées dans de multiples applications (CRM, SAV, Ventes), rendant toute vision 360° impossible et générant des erreurs lors de croisements manuels.",
        process: "Mise en œuvre d'une architecture ETL. Agrégation et déduplication des données multi-sources. Harmonisation complexe et établissement de règles strictes de qualité des données à l'aide d'outils comme Dataiku.",
        result: "Constitution d'un socle de données fiable et unifié (Single Source of Truth), réduisant drastiquement le temps alloué au nettoyage manuel et garantissant la justesse des analyses.",
        techs: ["Data Engineering", "ETL", "SQL", "Dataiku"],
        category: "Ingénierie Data"
    },
    {
        id: "p6",
        icon: LayoutDashboard,
        title: "Dashboard expérience client",
        shortDesc: "Pilotage des indicateurs de satisfaction et de performance.",
        context: "Face à une volonté d'améliorer la rétention client, le service client souffrait d'un manque de visibilité globale sur les indicateurs clés de satisfaction (NPS, CSAT) et sur le volume de réclamations.",
        process: "Développement d'un pipeline récupérant automatiquement les verbatims et les notes. Modélisation sémantique simple pour catégoriser les problèmes rencontrés. Mise à disposition de ces insights via une interface de pilotage intuitive.",
        result: "Démocratisation de la 'Voix du Client' auprès de tous les managers. Les équipes disposent désormais d'une lecture claire des irritants principaux pour prioriser la résolution des problèmes courants.",
        techs: ["BI", "Power BI", "SQL"],
        category: "Business Intelligence"
    },
    {
        id: "p7",
        icon: LineChart,
        title: "Analyse comportementale & tendances",
        shortDesc: "Anticipation des évolutions des comportements clients.",
        context: "Dans un contexte de transformation de l'offre de service, il était indispensable de mieux comprendre les trajectoires d'usage des utilisateurs pour anticiper les baisses d'engagement (Churn) sur certaines lignes de produits.",
        process: "Analyse exploratoire de la dimension temporelle de la base client en utilisant Pandas et Scikit-Learn. Détection précoce de signaux faibles précédant le désabonnement ou la cessation d'achat, et formalisation des insights sous forme de recommandations.",
        result: "Mise en lumière de patterns temporels inconnus de la direction commerciale, permettant d'adopter une posture proactive et de créer des offres préventives ciblées.",
        techs: ["Analytics", "Python", "Pandas", "Scikit"],
        category: "Analyse"
    },
    {
        id: "p8",
        icon: GitBranch,
        title: "Conception d'un pipeline data & architecture analytique",
        shortDesc: "Automatisation de la collecte et transformation des données.",
        context: "Le cycle de vie de la donnée dépendait lourdement de l'intervention humaine (requêtes manuelles, transferts CSV par email), constituant un goulet d'étranglement majeur bloquant le passage à l'échelle des projets Data Analytics.",
        process: "Ingestion automatisée depuis des API métiers et bases relationnelles vers un environnement Cloud (Data Lake / Data Warehouse) via PySpark. Structuration d'une chaîne de traitement robuste, orchestrée, sécurisée et reproductible.",
        result: "Suppression totale du traitement manuel récurrent. L'entreprise bénéficie désormais d'une infrastructure back-end fluide alimentant ses dashboards et ses algorithmes avec une donnée fraîche et fiable.",
        techs: ["Data Engineering", "Python", "PySpark", "Cloud"],
        category: "Ingénierie Data"
    },
    {
        id: "p9",
        icon: TrendingUp,
        title: "Stratégie pricing & clustering clients — Renault Trucks",
        shortDesc: "Outil d'aide à la décision pour structurer les remises commerciales.",
        context: "Projet réalisé pour Renault Trucks (Volvo Group). Les directeurs régionaux accordaient des remises clients de façon non structurée, sans grille de référence objective. L'objectif était de construire un outil d'aide à la décision basé sur les données.",
        process: "Jointure de deux sources de données (transactions financières + immatriculations parc clients) via clé VIN sur Databricks. Clustering K-Means sur les clients réseau avec des variables métier : taille de flotte, part de marché, volume d'achats, ancienneté, taux d'équipement, marge. Détection d'anomalies de remises normalisées par tendance marché annuelle.",
        result: "Segmentation en 4 profils clients actionnables, score de potentiel de conquête, et dashboard Power BI présenté aux directeurs régionaux et au management.",
        techs: ["Python", "PySpark", "Databricks", "K-Means", "Power BI", "DAX"],
        category: "Machine Learning"
    },
    {
        id: "p10",
        icon: Cloud,
        title: "Pipeline de données temps réel sur Azure — Vélib'",
        shortDesc: "Plateforme cloud d'analyse de la disponibilité des stations en temps réel.",
        context: "Projet en équipe consistant à construire une plateforme de données cloud pour analyser la disponibilité des stations Vélib' en temps réel via les APIs ouvertes de Paris.",
        process: "Déploiement d'une infrastructure Azure complète (Data Lake Gen2, Data Factory, Databricks, Key Vault, Log Analytics). Mise en place d'une architecture Medallion Bronze/Silver/Gold avec Delta Lake. Pipeline d'ingestion automatique toutes les 5 minutes via Data Factory, transformations PySpark et agrégations métier via Databricks.",
        result: "Plateforme opérationnelle avec pipeline de bout en bout, données nettoyées et agrégées en temps réel, infrastructure sécurisée et monitorée.",
        techs: ["Azure", "Databricks", "PySpark", "Data Factory", "Delta Lake", "Draw.io"],
        category: "Ingénierie Data"
    }
];

const projectsEN: Project[] = [
    {
        id: "p1",
        icon: LineChart,
        title: "Competitive Analysis & Market Share",
        shortDesc: "Strategic vision of market positioning against competitors.",
        context: "In a highly competitive market, having a clear vision of the brand's positioning against major industry players was crucial. Management lacked standardized indicators to objectively compare performances.",
        process: "Consolidation of internal and external data into a single source of truth. Creation of a market share analysis model by geographical segment and product type. In-depth study of competitive dynamics and macroeconomic trends.",
        result: "Delivery of a consolidated strategic vision immediately identifying commercial development opportunities and adapting the marketing action plan.",
        techs: ["Analytics", "Python", "SQL", "Excel"],
        category: "Analyse"
    },
    {
        id: "p2",
        icon: Brain,
        title: "Customer Segmentation & Modeling",
        shortDesc: "Enhanced understanding of customer behaviors.",
        context: "To personalize the commercial approach and optimize marketing campaign ROI, the company needed to go beyond arbitrary simple-criteria segmentation to understand true purchasing behaviors.",
        process: "Extraction, cleaning, and preparation of transactional data. Feature engineering phase to synthesize recent behaviors, frequency, and value. Development and evaluation of clustering models (K-Means) to create homogeneous profiles.",
        result: "Identified actionable customer groups with distinct value potentials, allowing marketing teams to deploy ultra-targeted campaigns.",
        techs: ["Machine Learning", "Python", "XGBoost", "K-Means"],
        category: "Machine Learning"
    },
    {
        id: "p3",
        icon: CircleDollarSign,
        title: "Pricing Strategy Optimization",
        shortDesc: "Aligning competitiveness with profitability.",
        context: "Market price volatility required a more agile pricing strategy. The challenge was finding the optimal equilibrium point between maintaining margins and the commercial competitiveness of B2B offers.",
        process: "Creation of analytical tools modeling historical price elasticity. Integration of competitive data sources for real-time benchmarking. Simulation of various margin and volume scenarios to guide management.",
        result: "Provided a mathematical and objective decision-support framework, enabling sales managers to justify their pricing with tangible data.",
        techs: ["Machine Learning", "Simulation"],
        category: "Machine Learning"
    },
    {
        id: "p4",
        icon: LayoutDashboard,
        title: "Executive Dashboards Design",
        shortDesc: "Dynamic performance monitoring for business teams.",
        context: "Executive teams were using dozens of scattered static reports, significantly slowing down the tracking of the company's weekly and monthly performances.",
        process: "Collaboration with stakeholders to define a pyramid of relevant KPIs. Structuring of a robust star data model (Data Modeling). Creation of interactive, clear, and action-oriented Power BI visualizations using DAX.",
        result: "Centralization of strategic monitoring via a single tool, accelerating decision-making during executive committees and establishing a genuine data culture.",
        techs: ["BI", "Power BI", "DAX", "Data Modeling"],
        category: "Business Intelligence"
    },
    {
        id: "p5",
        icon: Database,
        title: "Customer Data Centralization",
        shortDesc: "Creation of a consolidated database for reliable analysis.",
        context: "Customer interaction data was siloed across multiple applications (CRM, Support, Sales), making any 360° view impossible and generating errors during manual cross-referencing.",
        process: "Implementation of an ETL architecture. Aggregation and deduplication of multi-source data. Complex harmonization and establishment of strict data quality rules using tools like Dataiku.",
        result: "Formation of a reliable and unified data foundation (Single Source of Truth), drastically reducing manual cleaning time and ensuring analytical accuracy.",
        techs: ["Data Engineering", "ETL", "SQL", "Dataiku"],
        category: "Ingénierie Data"
    },
    {
        id: "p6",
        icon: LayoutDashboard,
        title: "Customer Experience Dashboard",
        shortDesc: "Monitoring satisfaction and performance indicators.",
        context: "Facing a desire to improve customer retention, the customer service department lacked overall visibility of key satisfaction indicators (NPS, CSAT) and complaint volumes.",
        process: "Development of a pipeline automatically retrieving feedback and ratings. Simple semantic modeling to categorize encountered problems. Delivery of these insights via an intuitive monitoring interface.",
        result: "Democratization of the 'Voice of the Customer' to all managers. Teams now have a clear view of main irritants to prioritize the resolution of common issues.",
        techs: ["BI", "Power BI", "SQL"],
        category: "Business Intelligence"
    },
    {
        id: "p7",
        icon: LineChart,
        title: "Behavioral Analysis & Trends",
        shortDesc: "Anticipating evolutions in customer behaviors.",
        context: "In the context of transforming the service offering, it was essential to better understand user usage trajectories to anticipate drops in engagement (Churn) across certain product lines.",
        process: "Exploratory analysis of the temporal dimension of the customer base using Pandas and Scikit-Learn. Early detection of weak signals preceding unsubscription or purchase cessation, formalizing insights as recommendations.",
        result: "Unveiled temporal patterns previously unknown to the sales direction, enabling a proactive posture and the creation of targeted preventive offers.",
        techs: ["Analytics", "Python", "Pandas", "Scikit"],
        category: "Analyse"
    },
    {
        id: "p8",
        icon: GitBranch,
        title: "Data Pipeline & Analytics Architecture Design",
        shortDesc: "Automating data collection and transformation.",
        context: "The data lifecycle relied heavily on human intervention (manual queries, CSV transfers via email), constituting a major bottleneck preventing the scaling of Data Analytics projects.",
        process: "Automated ingestion from business APIs and relational databases into a Cloud environment (Data Lake / Data Warehouse) via PySpark. Structuring of a robust, orchestrated, secure, and reproducible processing chain.",
        result: "Total elimination of recurring manual processing. The company now benefits from a fluid backend infrastructure feeding its dashboards and algorithms with fresh, reliable data.",
        techs: ["Data Engineering", "Python", "PySpark", "Cloud"],
        category: "Ingénierie Data"
    },
    {
        id: "p9",
        icon: TrendingUp,
        title: "Pricing Strategy & Customer Clustering — Renault Trucks",
        shortDesc: "Decision-support tool to structure commercial discount policies.",
        context: "Project carried out for Renault Trucks (Volvo Group). Regional directors were granting customer discounts in an unstructured way, without any objective reference framework. The goal was to build a data-driven decision-support tool.",
        process: "Join of two data sources (financial transactions + customer fleet registrations) via VIN key on Databricks. K-Means clustering on network customers using business variables: fleet size, market share, purchase volume, seniority, equipment rate, and margin. Detection of discount anomalies normalized by annual market trend.",
        result: "Segmentation into 4 actionable customer profiles, a conquest potential score, and a Power BI dashboard presented to regional directors and management.",
        techs: ["Python", "PySpark", "Databricks", "K-Means", "Power BI", "DAX"],
        category: "Machine Learning"
    },
    {
        id: "p10",
        icon: Cloud,
        title: "Real-Time Data Pipeline on Azure — Vélib'",
        shortDesc: "Cloud data platform analyzing station availability in real time.",
        context: "Team project to build a cloud data platform for analyzing Vélib' bike-share station availability in real time using Paris open APIs.",
        process: "Deployment of a full Azure infrastructure (Data Lake Gen2, Data Factory, Databricks, Key Vault, Log Analytics). Implementation of a Medallion Bronze/Silver/Gold architecture with Delta Lake. Automatic ingestion pipeline every 5 minutes via Data Factory, PySpark transformations and business aggregations via Databricks.",
        result: "Operational platform with an end-to-end pipeline, cleaned and aggregated real-time data, secured and monitored infrastructure.",
        techs: ["Azure", "Databricks", "PySpark", "Data Factory", "Delta Lake", "Draw.io"],
        category: "Ingénierie Data"
    }
];

const categories: ("Tous" | ProjectCategory)[] = [
    "Tous", "Analyse", "Machine Learning", "Business Intelligence", "Ingénierie Data"
];

const categoryTranslations: Record<string, string> = {
    "Tous": "All",
    "Analyse": "Data Analysis",
    "Machine Learning": "Machine Learning",
    "Business Intelligence": "Business Intelligence",
    "Ingénierie Data": "Data Engineering"
};

const Projects = () => {
    const { t, lang } = useLanguage();
    const projects = lang === "FR" ? projectsFR : projectsEN;

    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<"Tous" | ProjectCategory>("Tous");
    const [isAnimating, setIsAnimating] = useState(false);

    const { setElements, visibleEntries } = useIntersectionObserver({ rootMargin: "-20% 0px -50% 0px", threshold: 0.1 });
    const { setElements: setRevealElements, visibleEntries: revealedItems } = useScrollReveal({ threshold: 0.08 });
    const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const els = timelineRefs.current.filter(Boolean) as Element[];
        setElements(els);
        setRevealElements(els);
    }, [setElements, setRevealElements, activeFilter]);

    // Find the currently active project based on scroll intersection
    const activeEntry = visibleEntries.find(e => e.isIntersecting);
    const activeIndex = activeEntry ? timelineRefs.current.indexOf(activeEntry.target as HTMLDivElement) : -1;

    const toggleExpand = (id: string, event: React.MouseEvent) => {
        event.preventDefault();
        setExpandedId(expandedId === id ? null : id);
    };

    const handleFilterChange = (cat: "Tous" | ProjectCategory) => {
        if (cat === activeFilter) return;
        setIsAnimating(true);
        setExpandedId(null); // Close any open accordion to avoid jumping
        setTimeout(() => {
            setActiveFilter(cat);
            setIsAnimating(false);
        }, 250); // Mapped to the 0.25s fadeOut animation
    };

    const filteredProjects = projects.filter(p => activeFilter === "Tous" || p.category === activeFilter);

    // Dynamic Filter Title
    const sectionTitle = lang === "FR"
        ? (activeFilter === "Tous" ? "Projets" : `Projets ${activeFilter}`)
        : (activeFilter === "Tous" ? "Projects" : `${categoryTranslations[activeFilter]} Projects`);

    return (
        <section id="projects" className={`section ${styles.projectsSection}`}>
            <div className="container" style={{ position: 'relative' }}>
                <div className={styles.sectionHeader}>
                    <h2 key={activeFilter} className={`${styles.sectionTitle} animate-slide-in-left`}>
                        {sectionTitle}
                    </h2>
                </div>

                <div className={`${styles.filterBar} animate-fade-in-up delay-100`}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilter : ''}`}
                            onClick={() => handleFilterChange(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={`${styles.timelineContainer} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
                    <div className={styles.timeline}>
                        <div className={styles.timelineTrack}></div>

                        {filteredProjects.map((project, index) => {
                            const isExpanded = expandedId === project.id;
                            const isActiveScroll = activeIndex === index;
                            const el = timelineRefs.current[index] ?? null;
                            const isRevealed = el !== null && revealedItems.has(el);

                            return (
                                <div
                                    key={project.id}
                                    ref={el => { timelineRefs.current[index] = el; }}
                                    className={`${styles.timelineItem} ${isRevealed ? styles.scrollVisible : styles.scrollHidden}`}
                                    style={{ animationDelay: isRevealed ? `${(index % 4) * 70}ms` : '0ms' }}
                                >
                                    <div className={`${styles.timelineDot} ${isActiveScroll || isExpanded ? styles.activeDot : ''}`}></div>

                                    <div
                                        className={`${styles.projectCard} ${isExpanded ? styles.expandedCard : ''}`}
                                        onClick={(e) => toggleExpand(project.id, e)}
                                    >
                                        <div className={styles.cardHeader}>
                                            <div className={styles.headerContent}>
                                                <h3 className={styles.projectTitle}>
                                                    <project.icon className={styles.projectIcon} size={18} strokeWidth={2} />
                                                    <span className={styles.titleText}>{project.title}</span>
                                                </h3>
                                                <p className={styles.shortDesc}>{project.shortDesc}</p>

                                                <div className={styles.techStack}>
                                                    {project.techs.map((tech, i) => (
                                                        <span key={i} className={styles.techPill}>{tech}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className={styles.toggleIcon}>
                                                {isExpanded ? '×' : '+'}
                                            </div>
                                        </div>

                                        <div
                                            className={styles.cardContentWrapper}
                                            // 1200px is a safe max-height that ensures enough space to render the text. 
                                            // The transition property handles smoothing. No JS auto-scroll is triggered.
                                            style={{ maxHeight: isExpanded ? '1200px' : '0px' }}
                                        >
                                            <div className={styles.cardContent}>
                                                <div className={styles.contentBlock}>
                                                    <h4 className={styles.blockTitle}>{lang === "FR" ? "01. Contexte" : "01. Context"}</h4>
                                                    <p className={styles.blockText}>{project.context}</p>
                                                </div>

                                                <div className={styles.contentBlock}>
                                                    <h4 className={styles.blockTitle}>{lang === "FR" ? "02. Approche" : "02. Strategy"}</h4>
                                                    <p className={styles.blockText}>{project.process}</p>
                                                </div>

                                                <div className={styles.contentBlock}>
                                                    <h4 className={styles.blockTitle}>{lang === "FR" ? "03. Résultat & Impact" : "03. Result & Impact"}</h4>
                                                    <div className={styles.resultBox}>
                                                        <p className={styles.resultText}>{project.result}</p>
                                                    </div>
                                                </div>

                                                <div className={styles.contentBlock}>
                                                    <h4 className={styles.blockTitle}>{lang === "FR" ? "04. Stack technique" : "04. Tech Stack"}</h4>
                                                    <div className={styles.detailTechs}>
                                                        {project.techs.map((tech, i) => (
                                                            <span key={i} className={styles.detailTechPill}>{tech}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
