'use client'
import { useState } from 'react'
import styles from './Projects.module.css'

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all')

    const projects = [
        // AI & NLP Projects
        {
            title: 'Realtime AI Backend',
            description: 'High-performance asynchronous Python backend for real-time AI conversations with WebSocket communication, function calling, and streaming responses',
            technologies: ['FastAPI', 'WebSocket', 'Supabase', 'Groq', 'LLM Function Calling', 'Python'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/Realtime-AI-Backend'
        },
        {
            title: 'AI Voice Agent',
            description: 'Real-time multilingual conversational voice assistant with sub-second latency, enabling seamless voice-to-voice interactions',
            technologies: ['LLaMA 3 (Groq)', 'ElevenLabs TTS', 'Deepgram STT', 'Flask APIs', 'Python'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/AI-Voice-Agent'
        },
        {
            title: 'HSN Code Validation AI Agent',
            description: 'NLP-powered chatbot for accurate HSN code classification and validation using natural language processing',
            technologies: ['SpaCy', 'NLP', 'Excel Integration', 'Python', 'Machine Learning'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/HSN-Code-Validation'
        },
        {
            title: 'PII Detection Email Classifier',
            description: 'ML-based NLP classifier for detecting and protecting sensitive personal information in email communications',
            technologies: ['TF-IDF', 'Scikit-learn', 'NLP', 'Supervised Learning', 'Python'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/PII-Detection-Email-Classifier'
        },
        // ML & Predictive Analytics
        {
            title: 'Diabetes Prediction',
            description: 'Machine learning model using Support Vector Machine (SVM) to predict diabetes likelihood based on health parameters',
            technologies: ['SVM', 'Scikit-learn', 'Python', 'Pandas', 'NumPy'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/Diabetes-Prediction-using-Machine-Learning'
        },
        {
            title: 'Financial Fraud Detection',
            description: 'Advanced ML solution for detecting fraudulent transactions in financial systems using classification algorithms',
            technologies: ['Machine Learning', 'Classification', 'Python', 'Scikit-learn', 'Data Analysis'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/Financial-Fraud-Detection'
        },
        {
            title: 'House Price Prediction',
            description: 'Regression model predicting California house prices using XGBoost with comprehensive EDA and feature engineering',
            technologies: ['XGBoost', 'Regression', 'Python', 'Pandas', 'Matplotlib'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/House-Price-Prediction-using-XGBoost-and-California-Housing-Dataset'
        },
        {
            title: 'SONAR Rock vs Mine Prediction',
            description: 'Classification model predicting whether SONAR signals are from rocks or mines using supervised learning',
            technologies: ['Classification', 'Scikit-learn', 'Python', 'Machine Learning', 'UCI Dataset'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/SONAR-Rock-vs-Mine-Prediction'
        },
        // Data Analysis
        {
            title: 'Stock Market Crash 2008 Analysis',
            description: 'Comprehensive analysis of the 2008 financial crisis impact on stock indices, exploring volatility and market dynamics',
            technologies: ['Data Analysis', 'Python', 'Pandas', 'Matplotlib', 'Financial Analysis'],
            category: 'data-analysis',
            github: 'https://github.com/allwin107/Stock-Market-Crash-2008-Insights'
        },
        {
            title: 'Fantasy Team Simulation',
            description: 'Probability-based simulation generating 20,000 unique fantasy cricket teams using player selection probabilities',
            technologies: ['Python', 'Probability', 'Simulation', 'Data Analysis', 'Algorithm Design'],
            category: 'data-analysis',
            github: 'https://github.com/allwin107/Fantasy-Team-Simulation-using-Player-Selection-Probabilities'
        }
    ]

    const categories = [
        { id: 'all', label: 'All Projects', count: projects.length },
        { id: 'ai-nlp', label: 'AI & NLP', count: projects.filter(p => p.category === 'ai-nlp').length },
        { id: 'ml-analytics', label: 'ML & Predictive Analytics', count: projects.filter(p => p.category === 'ml-analytics').length },
        { id: 'data-analysis', label: 'Data Analysis', count: projects.filter(p => p.category === 'data-analysis').length }
    ]

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter)

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">Projects</h2>

                <div className={styles.filterButtons}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.filterBtn} ${activeFilter === category.id ? styles.active : ''}`}
                            onClick={() => setActiveFilter(category.id)}
                        >
                            {category.label}
                            <span className={styles.count}>{category.count}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-3">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className={`card ${styles.projectCard}`}>
                            <div className={styles.projectHeader}>
                                <svg className={styles.projectIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                            </div>
                            <p className={styles.projectDescription}>{project.description}</p>
                            <div className={styles.technologies}>
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tag">{tech}</span>
                                ))}
                            </div>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.githubLink}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                                View on GitHub
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
