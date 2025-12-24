import styles from './About.module.css'

export default function About() {
    const highlights = [
        {
            title: 'Conversational AI & NLP',
            description: 'Experienced in building multilingual voice assistants and NLP-powered chatbots using LLMs and speech technologies'
        },
        {
            title: 'Production-Grade ML Systems',
            description: 'Experienced in developing and deploying scalable machine learning models for real-world applications'
        },
        {
            title: 'End-to-End AI Deployment',
            description: 'Experienced in the complete ML lifecycle from data preprocessing to API development and deployment'
        }
    ]

    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className={styles.aboutContent}>
                    <div className={styles.objective}>
                        <p>
                            Aspiring AI and Machine Learning Engineer with hands-on experience in developing
                            production-grade AI systems, Experienced in Conversational AI, NLP, and end-to-end
                            ML deployment. Passionate about leveraging cutting-edge technologies to solve real-world
                            challenges and drive innovation in AI-powered solutions.
                        </p>
                    </div>

                    <div className="grid grid-3">
                        {highlights.map((highlight, index) => (
                            <div key={index} className="card">
                                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                                <p className="mb-0">{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
