'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form after success
        setTimeout(() => {
          setFormState({ name: '', email: '', subject: '', message: '' })
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
      </div>
    )
  }

  if (submitStatus === 'error') {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 mb-4">
          Failed to send your message. Please try again or email me directly.
        </p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          className="bg-black text-white hover:opacity-90"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
      </div>

      {/* Subject Input */}
      <div className="space-y-2 mt-6">
        <label htmlFor="subject" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          required
          className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Select a subject</option>
          <option value="project">Project Inquiry</option>
          <option value="collaboration">Collaboration</option>
          <option value="question">General Question</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message Textarea */}
      <div className="space-y-2 mt-6">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or what you'd like to discuss..."
          value={formState.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white hover:opacity-90 h-12 text-base font-medium rounded-full"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        I typically respond within 24-48 hours.
      </p>
    </form>
  )
}
