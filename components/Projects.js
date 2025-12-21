import styles from './Projects.module.css'

export default function Projects() {
    const projects = [
        {
            title: 'Realtime AI Backend',
            description: 'High-performance asynchronous Python backend for real-time AI conversations with WebSocket communication, function calling, streaming responses, and persistent storage using Supabase',
            technologies: ['FastAPI', 'WebSocket', 'Supabase', 'Groq', 'LLM Function Calling', 'Python', 'Async/Await']
        },
        {
            title: 'AI Voice Agent',
            description: 'Real-time multilingual conversational voice assistant with sub-second latency, enabling seamless voice-to-voice interactions',
            technologies: ['LLaMA 3 (Groq)', 'ElevenLabs TTS', 'Deepgram STT', 'Flask APIs', 'Python']
        },
        {
            title: 'HSN Code Validation AI Agent',
            description: 'NLP-powered chatbot for accurate HSN code classification and validation using natural language processing',
            technologies: ['SpaCy', 'NLP', 'Excel Integration', 'Python', 'Machine Learning']
        },
        {
            title: 'PII Detection Email Classifier',
            description: 'ML-based NLP classifier for detecting and protecting sensitive personal information in email communications',
            technologies: ['TF-IDF', 'Scikit-learn', 'NLP', 'Supervised Learning', 'Python']
        }
    ]

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">Projects</h2>

                <div className="grid grid-3">
                    {projects.map((project, index) => (
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
