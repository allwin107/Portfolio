import styles from './Experience.module.css'

export default function Experience() {
    const experiences = [
        {
            role: 'AI Voice Intern',
            company: 'Word Works AI Pvt. Ltd.',
            duration: 'Sept 2025 - Dec 2025',
            location: 'Remote',
            achievements: [
                'Developed a real-time multilingual conversational voice assistant using LLaMA 3 (Groq), ElevenLabs TTS, and Deepgram STT',
                'Integrated Flask APIs to enable seamless voice-to-voice interactions with sub-second latency',
                'Implemented advanced prompt engineering techniques to optimize LLM responses for conversational accuracy',
                'Deployed the voice assistant on a scalable cloud infrastructure, ensuring high availability and performance'
            ]
        },
        {
            role: 'Assistant System Engineer',
            company: 'Tata Consultancy Services',
            duration: 'Oct 2024 - March 2025',
            location: 'Bangalore',
            achievements: [
                'Worked on enterprise-level projects involving system integration and automation',
                'Collaborated with cross-functional teams to deliver high-quality software solutions'
            ]
        },
        {
            role: 'Python Backend Developer Intern',
            company: 'Cartoon Mango',
            duration: 'Feb 2024 - April 2024',
            location: 'Remote',
            achievements: [
                'Developed RESTful APIs using Flask and FastAPI for backend services'
            ]
        }
    ]

    return (
        <section id="experience" className="section" style={{ background: 'var(--color-bg-alt)' }}>
            <div className="container">
                <h2 className="section-title">Experience</h2>

                <div className={styles.timeline}>
                    {experiences.map((exp, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <div className={styles.experienceHeader}>
                                    <div>
                                        <h3 className={styles.role}>{exp.role}</h3>
                                        <h4 className={styles.company}>{exp.company}</h4>
                                    </div>
                                    <div className={styles.experienceMeta}>
                                        <span className={styles.duration}>{exp.duration}</span>
                                        <span className={styles.location}>{exp.location}</span>
                                    </div>
                                </div>
                                <ul className={styles.achievements}>
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
