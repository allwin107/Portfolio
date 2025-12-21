import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Allwin Raja J - AI & Machine Learning Engineer',
    description: 'Portfolio of Allwin Raja J, an AI and Machine Learning Engineer specializing in Conversational AI, NLP, and production-grade ML systems.',
    keywords: ['AI Engineer', 'Machine Learning', 'NLP', 'Conversational AI', 'Python Developer'],
    authors: [{ name: 'Allwin Raja J' }],
    openGraph: {
        title: 'Allwin Raja J - AI & Machine Learning Engineer',
        description: 'Portfolio showcasing AI/ML projects, experience, and skills',
        type: 'website',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
