import type { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Me | Russel Maniacop',
  description:
    'Get in touch with me for web development projects, collaborations, or general inquiries. I typically respond within 24-48 hours.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn delay={0}>
            <div className="text-center">
              <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-br-2xl font-medium text-sm mb-4">
                Get In Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 uppercase tracking-tight">
                Let's Work Together
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                Have a project in mind or want to collaborate? Fill out the form
                below and I'll get back to you as soon as possible.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Me</h3>
                <a
                  href="mailto:keithmaniacop@gmail.com"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  keithmaniacop@gmail.com
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-sm text-gray-600">
                  Dagupan City, Philippines
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Response Time
                </h3>
                <p className="text-sm text-gray-600">24-48 hours</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn delay={0.4}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
