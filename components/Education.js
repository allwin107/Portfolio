import styles from './Education.module.css'

export default function Education() {
    const education = [
        {
            degree: 'B.Tech – AI and Data Science',
            institution: 'K Ramakrishnan College of Technology',
            duration: '2020 – 2024',
            grade: 'CGPA: 8.1'
        },
        {
            degree: 'HSC',
            institution: 'Infant Jesus Matriculation Hr Sec School',
            duration: '2019 – 2020',
            grade: '71%'
        },
        {
            degree: 'SSLC',
            institution: 'Infant Jesus Matriculation Hr Sec School',
            duration: '2017 – 2018',
            grade: '86%'
        }
    ]

    const certifications = [
        'Programming for Everybody – Python (Coursera)',
        'Machine Learning with Python (FreeCodeCamp)',
        'Data Analysis with Python (FreeCodeCamp)',
        'Database Management Essentials (Coursera)',
        'Introduction to Artificial Intelligence(Simplilearn)',
        'Foundations: Data, Data, Everywhere(Google)',
    ]

    return (
        <section id="education" className="section">
            <div className="container">
                <h2 className="section-title">Education & Certifications</h2>

                <div className={styles.educationContainer}>
                    <div className={styles.educationSection}>
                        <h3 className={styles.sectionHeading}>Education</h3>
                        <div className={styles.educationList}>
                            {education.map((edu, index) => (
                                <div key={index} className={`card ${styles.educationCard}`}>
                                    <h4 className={styles.degree}>{edu.degree}</h4>
                                    <p className={styles.institution}>{edu.institution}</p>
                                    <div className={styles.eduMeta}>
                                        <span className={styles.duration}>{edu.duration}</span>
                                        <span className={styles.grade}>{edu.grade}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.certificationsSection}>
                        <h3 className={styles.sectionHeading}>Certifications</h3>
                        <div className={styles.certificationsList}>
                            {certifications.map((cert, index) => (
                                <div key={index} className={styles.certificationItem}>
                                    <svg className={styles.certIcon} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
