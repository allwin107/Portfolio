'use client'
import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please try emailing me directly.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="section" style={{ background: 'var(--color-bg-alt)' }}>
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <div className={styles.contactContainer}>
                    <div className={styles.contactInfo}>
                        <h3>Contact Information</h3>
                        <p className={styles.contactText}>
                            Feel free to reach out for collaborations, opportunities, or just a friendly chat about AI and ML!
                        </p>

                        <div className={styles.infoItems}>
                            <div className={styles.infoItem}>
                                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:allwinraja2002@gmail.com">allwinraja2002@gmail.com</a>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <div>
                                    <h4>Phone</h4>
                                    <a href="tel:+919025014336">+91 9025014336</a>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4>Location</h4>
                                    <p>Tamil Nadu, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="form-input"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {status.message && (
                            <div className={`${styles.statusMessage} ${styles[status.type]}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
