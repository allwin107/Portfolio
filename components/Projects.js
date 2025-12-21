'use client'
import { useState } from 'react'
import styles from './Projects.module.css'

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all')

    const projects = [
        // AI & NLP Projects (6)
        {
            title: 'Realtime AI Backend',
            description: 'High-performance asynchronous Python backend for real-time AI conversations with WebSocket communication and function calling',
            technologies: ['FastAPI', 'WebSocket', 'Supabase', 'Groq', 'Python'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/Realtime-AI-Backend'
        },
        {
            title: 'Tamil Voice Conversation System',
            description: 'End-to-end Tamil language AI toolkit combining ASR, LLM, and TTS for natural voice-based conversations',
            technologies: ['ASR', 'LLM', 'TTS', 'Tamil NLP', 'Python'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/ASR-LLM-TTS-Tamil-Lang'
        },
        {
            title: 'AI Voice Agent',
            description: 'Real-time multilingual conversational voice assistant with sub-second latency and seamless interactions',
            technologies: ['LLaMA 3', 'ElevenLabs TTS', 'Deepgram STT', 'Flask'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/AI-Voice-Agent'
        },
        {
            title: 'HSN Code Validation AI Agent',
            description: 'NLP-powered chatbot for accurate HSN code classification using natural language processing',
            technologies: ['SpaCy', 'NLP', 'Python', 'Machine Learning'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/HSN-Code-Validation'
        },
        {
            title: 'Local Chatbot',
            description: 'Simple local chatbot application for conversational AI interactions without cloud dependencies',
            technologies: ['Python', 'NLP', 'Local LLM', 'Chatbot'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/Local_Chatbot'
        },
        {
            title: 'PII Detection Email Classifier',
            description: 'ML-based NLP classifier for detecting sensitive personal information in email communications',
            technologies: ['TF-IDF', 'Scikit-learn', 'NLP', 'Python'],
            category: 'ai-nlp',
            github: 'https://github.com/allwin107/PII-Detection-Email-Classifier'
        },
        // ML & Predictive Analytics (5)
        {
            title: 'Diabetes Prediction',
            description: 'SVM-based machine learning model predicting diabetes likelihood from health parameters',
            technologies: ['SVM', 'Scikit-learn', 'Python', 'Pandas'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/Diabetes-Prediction-using-Machine-Learning'
        },
        {
            title: 'Financial Fraud Detection',
            description: 'Advanced ML solution detecting fraudulent transactions using classification algorithms',
            technologies: ['Machine Learning', 'Classification', 'Python', 'Scikit-learn'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/Financial-Fraud-Detection'
        },
        {
            title: 'House Price Prediction',
            description: 'XGBoost regression model predicting California house prices with comprehensive EDA',
            technologies: ['XGBoost', 'Regression', 'Python', 'Pandas'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/House-Price-Prediction-using-XGBoost-and-California-Housing-Dataset'
        },
        {
            title: 'SONAR Rock vs Mine Prediction',
            description: 'Classification model predicting SONAR signal sources using supervised learning',
            technologies: ['Classification', 'Scikit-learn', 'Python', 'ML'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/SONAR-Rock-vs-Mine-Prediction',
            liveDemo: 'https://sonar-rock-vs-mine-prediction-six.vercel.app/'
        },
        {
            title: 'Stock Market Crash 2008 Analysis',
            description: 'Comprehensive analysis of 2008 financial crisis impact on stock indices and volatility',
            technologies: ['Data Analysis', 'Python', 'Pandas', 'Matplotlib'],
            category: 'ml-analytics',
            github: 'https://github.com/allwin107/Stock-Market-Crash-2008-Insights'
        },
        // Full-Stack Applications (4)
        {
            title: 'FastDoc - AI Document Processing',
            description: 'Intelligent document processing system with AI extraction, human verification, and Excel export',
            technologies: ['AI', 'OCR', 'Flask', 'React', 'Excel'],
            category: 'fullstack',
            github: 'https://github.com/allwin107/FastDoc--AI_Powered_Document_Processing_System'
        },
        {
            title: 'Email Classifier Pro',
            description: 'Enterprise email classification system with PII detection and advanced categorization',
            technologies: ['NLP', 'Flask', 'React', 'Classification', 'PII'],
            category: 'fullstack',
            github: 'https://github.com/allwin107/email-classifier-pro',
            liveDemo: 'https://email-classifier-frontend-3n97.onrender.com/'
        },
        {
            title: 'Loan Prediction Web App',
            description: 'Flask-based web app using Random Forest to predict loan approval with responsive UI',
            technologies: ['Flask', 'Random Forest', 'HTML/CSS', 'Python'],
            category: 'fullstack',
            github: 'https://github.com/allwin107/Loan-Prediction-Web-App',
            liveDemo: 'https://loan-prediction-web-app-iota.vercel.app/'
        },
        {
            title: 'IdeaForge',
            description: 'Next.js application for idea generation and project management',
            technologies: ['Next.js', 'React', 'JavaScript', 'Web App'],
            category: 'fullstack',
            github: 'https://github.com/allwin107/IdeaForge',
            liveDemo: 'https://idea-forge-brown.vercel.app/'
        },
        // Tools & Utilities (3)
        {
            title: 'Live OCR Camera Feed',
            description: 'Real-time OCR system capturing live video and extracting text using Tesseract and OpenCV',
            technologies: ['Tesseract', 'OpenCV', 'Python', 'OCR'],
            category: 'tools',
            github: 'https://github.com/allwin107/Live-OCR-Camera-Feed-with-Tesseract-and-OpenCV'
        },
        {
            title: 'Fantasy Team Simulation',
            description: 'Probability-based simulation generating 20,000 unique fantasy cricket teams',
            technologies: ['Python', 'Probability', 'Simulation', 'Algorithm'],
            category: 'tools',
            github: 'https://github.com/allwin107/Fantasy-Team-Simulation-using-Player-Selection-Probabilities'
        },
        {
            title: 'Simple Calculator',
            description: 'GUI calculator application built with Tkinter for basic arithmetic operations',
            technologies: ['Python', 'Tkinter', 'GUI', 'Desktop App'],
            category: 'tools',
            github: 'https://github.com/allwin107/Simple-Calculator-with-Tkinter'
        }
    ]

    const categories = [
        { id: 'all', label: 'All Projects', count: projects.length, icon: '📁' },
        { id: 'ai-nlp', label: 'AI & NLP', count: projects.filter(p => p.category === 'ai-nlp').length, icon: '🤖' },
        { id: 'ml-analytics', label: 'ML & Analytics', count: projects.filter(p => p.category === 'ml-analytics').length, icon: '📊' },
        { id: 'fullstack', label: 'Full-Stack Apps', count: projects.filter(p => p.category === 'fullstack').length, icon: '💼' },
        { id: 'tools', label: 'Tools & Utilities', count: projects.filter(p => p.category === 'tools').length, icon: '🔧' }
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
                            <span className={styles.icon}>{category.icon}</span>
                            {category.label}
                            <span className={styles.count}>{category.count}</span>
                        </button>
                    ))}
                </div>

                <div className={`grid ${styles.projectGrid}`}>
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

                            <div className={styles.projectLinks}>
                                {project.liveDemo && project.liveDemo !== 'VERCEL_URL_HERE' && (
                                    <a
                                        href={project.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.demoLink}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
