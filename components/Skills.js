import styles from './Skills.module.css'

export default function Skills() {
    const skillCategories = [
        {
            category: 'Technical Skills',
            skills: [
                'Python', 'Pandas', 'NumPy', 'Scikit-learn', 'NLP', 'SpaCy',
                'LLM APIs', 'Conversational AI', 'Speech-to-Text', 'Text-to-Speech',
                'Flask', 'FastAPI', 'REST APIs', 'Git', 'MySQL', 'JSON',
                'Data Validation', 'Tableau'
            ]
        },
        {
            category: 'Soft Skills',
            skills: [
                'Analytical Thinking', 'Problem-Solving', 'Data Presentation',
                'Collaboration', 'Continuous Learning', 'Adaptability'
            ]
        }
    ]

    return (
        <section id="skills" className="section" style={{ background: 'var(--color-bg-alt)' }}>
            <div className="container">
                <h2 className="section-title">Skills</h2>

                <div className={styles.skillsContainer}>
                    {skillCategories.map((category, index) => (
                        <div key={index} className={styles.skillCategory}>
                            <h3 className={styles.categoryTitle}>{category.category}</h3>
                            <div className={styles.skillTags}>
                                {category.skills.map((skill, i) => (
                                    <span key={i} className={`tag ${styles.skillTag}`}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
