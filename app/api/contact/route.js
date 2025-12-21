import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, subject, message } = body

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Check if Resend API key is configured
        const apiKey = process.env.RESEND_API_KEY
        const contactEmail = process.env.CONTACT_EMAIL || 'allwinraja2002@gmail.com'

        if (!apiKey) {
            // If API key is not configured, log the message and return success
            // This allows the form to work in development without email service
            console.log('Contact form submission (Email service not configured):')
            console.log({ name, email, subject, message })

            return NextResponse.json(
                {
                    success: true,
                    message: 'Message received! (Email service not configured yet)'
                },
                { status: 200 }
            )
        }

        // Send email using Resend
        const { Resend } = require('resend')
        const resend = new Resend(apiKey)

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: contactEmail,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        })

        return NextResponse.json(
            { success: true, message: 'Message sent successfully!' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        )
    }
}
