import Link from 'next/link';
import Image from 'next/image';
import { getPayloadClient } from '@/lib/payload';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Github, Linkedin, Code2 } from 'lucide-react';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPhp,
  SiWordpress,
  SiBootstrap,
  SiNextdotjs,
  SiFigma,
} from 'react-icons/si';
import type { Media } from '@/payload-types';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/animations/StaggerContainer';
import type { Metadata } from 'next';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Russel Maniacop - Web Developer & Code Hobbyist',
  description: 'I\'m a code hobbyist specializing in Web Development. Bringing designs into live website and webapp projects. Explore my portfolio, projects, and blog posts.',
  keywords: ['web developer', 'portfolio', 'Next.js', 'React', 'JavaScript', 'TypeScript', 'full-stack developer', 'Russel Maniacop'],
  authors: [{ name: 'Russel Maniacop' }],
  openGraph: {
    title: 'Russel Maniacop - Web Developer & Code Hobbyist',
    description: 'I\'m a code hobbyist specializing in Web Development. Bringing designs into live website and webapp projects.',
    url: 'https://russelmaniacop.com',
    siteName: 'Russel Maniacop Portfolio',
    images: [
      {
        url: '/media/keith.jpg',
        width: 1200,
        height: 630,
        alt: 'Russel Maniacop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Russel Maniacop - Web Developer & Code Hobbyist',
    description: 'I\'m a code hobbyist specializing in Web Development. Bringing designs into live website and webapp projects.',
    images: ['/images/keith.jpg'],
  },
};

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  const payload = await getPayloadClient();

  // Fetch featured projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      featured: {
        equals: true,
      },
    },
    sort: '-publishedAt',
    limit: 3,
    depth: 2,
  });

  // Fetch latest blog posts
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 3,
    depth: 2,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Main Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column - Profile & Content */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="space-y-6">
                {/* Profile Image */}
                <FadeIn delay={0}>
                  <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                    <Image
                      src="/images/keith.jpg"
                      alt="Russel Maniacop Profile"
                      fill
                      className="object-cover"
                      sizes="128px"
                      priority
                    />
                  </div>
                </FadeIn>

                {/* Greeting */}
                <FadeIn delay={0.1}>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                      Hello,{' '}
                      <span className="block mt-2">
                        I'm Russel Maniacop{' '}
                        <span className="inline-block animate-wave">👋</span>
                      </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
                      I'm a code hobbyist specializing in Web Development.
                      Bringing designs into live website and webapp projects.
                    </p>
                  </div>
                </FadeIn>

                {/* CTA Button */}
                <FadeIn delay={0.2}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                      View Projects
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      Read Blog
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Right Column - Social Links */}
            <FadeIn delay={0.3} className="lg:col-span-5 order-1 lg:order-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">
                  Connect With Me
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="https://github.com/KeithRussel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">GitHub</p>
                        <p className="text-sm text-gray-500">
                          View my repositories
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://codepen.io/keiiiiithh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">CodePen</p>
                        <p className="text-sm text-gray-500">
                          Explore my demos
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/russel-maniacop-12981a161/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Linkedin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">LinkedIn</p>
                        <p className="text-sm text-gray-500">
                          Connect professionally
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jsfiddle.net/u/keithrussel/fiddles/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#4679A4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">JSFiddle</p>
                        <p className="text-sm text-gray-500">
                          Check out my fiddles
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                    </a>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Showcasing my best work in web development and design
            </p>
          </div>

          {projects.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10 max-w-7xl mx-auto">
              {projects.map((project) => {
                const thumbnail = project.thumbnail as Media | null;
                const techStack = Array.isArray(project.techStack)
                  ? project.techStack
                  : [];

                // Normalize image URL - fix double slashes that break Next.js Image optimization
                const imageUrl = thumbnail?.url?.replace(/([^:]\/)\/+/g, '$1') || null;

                return (
                  <Link key={project.id} href={`/projects/${project.slug}`}>
                    <Card className="h-full group overflow-hidden border border-gray-200 hover:border-gray-300 transition-all bg-white shadow-sm hover:shadow-md">
                      {imageUrl && (
                        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={imageUrl}
                            alt={thumbnail?.alt || project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 font-light">
                          {project.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {techStack.slice(0, 3).map((tech, index) => {
                            const techName =
                              typeof tech === 'object' && 'technology' in tech
                                ? tech.technology
                                : null;
                            return techName ? (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 border-0 font-normal"
                              >
                                {techName}
                              </Badge>
                            ) : null;
                          })}
                          {techStack.length > 3 && (
                            <Badge
                              variant="outline"
                              className="border-gray-300 font-normal"
                            >
                              +{techStack.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            </>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="bg-gray-50 rounded-2xl p-12 border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Code2 className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Featured Projects Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Check back soon for exciting projects and case studies.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills/Tech Stack Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn delay={0}>
            <div className="mb-4">
              <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-br-2xl font-medium text-sm">
                Stacks
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 uppercase tracking-tight">
                Tech that I used and
                <br />
                familiar with
              </h2>
              <p className="text-base text-gray-600 max-w-2xl font-light">
                As a developer, I am heavily focused on using these tech stacks
                and passionate when comes to learning about the web for
                self-improvement and interest.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiHtml5 className="w-20 h-20 text-[#E34F26] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  HTML5
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiCss3 className="w-20 h-20 text-[#1572B6] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  CSS3
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiJavascript className="w-20 h-20 text-[#F7DF1E] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  JavaScript
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiReact className="w-20 h-20 text-[#61DAFB] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  React
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiNodedotjs className="w-20 h-20 text-[#339933] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Node.js
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiExpress className="w-20 h-20 text-gray-700 group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Express
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiMongodb className="w-20 h-20 text-[#47A248] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  MongoDB
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiPhp className="w-20 h-20 text-[#777BB4] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  PHP
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiWordpress className="w-20 h-20 text-[#21759B] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  WordPress
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiBootstrap className="w-20 h-20 text-[#7952B3] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Bootstrap
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiNextdotjs className="w-20 h-20 text-black group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Next.js
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group relative overflow-hidden">
                <SiFigma className="w-20 h-20 text-[#F24E1E] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Figma
                </span>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* About Me Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn delay={0}>
            <div className="text-center mb-12">
              <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-br-2xl font-medium text-sm mb-4">
                About Me
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 uppercase tracking-tight">
                Who I Am
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  I'm a passionate web developer with a love for creating
                  beautiful, functional, and user-friendly websites and web
                  applications. My journey into web development started as a
                  hobby, exploring the endless possibilities of what can be
                  built on the web.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Over the years, I've honed my skills in both frontend and
                  backend development, with a particular focus on modern
                  JavaScript frameworks and content management systems like
                  WordPress and currently studying PayloadCMS. I believe in
                  writing clean, maintainable code and creating experiences that
                  users love.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When I'm not coding, I'm constantly learning new technologies,
                  investing with AI's, and sharing my knowledge through blog
                  posts. I'm driven by the challenge of turning complex problems
                  into simple, elegant solutions.
                </p>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Currently
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>
                        Building modern web applications with Next.js and React
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>Exploring headless CMS and Payload CMS</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>
                        Creating web apps to improve my skills and satisfy my
                        curiosity
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn delay={0}>
            <div className="text-center mb-12">
              <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-br-2xl font-medium text-sm mb-4">
                Services
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 uppercase tracking-tight">
                What I Do
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto font-light">
                I specialize in creating modern, responsive, and user-friendly
                web solutions tailored to your needs.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group">
                <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Web Development
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Building custom websites and web applications using modern
                  frameworks like React, Next.js, and Node.js.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group">
                <div className="w-16 h-16 rounded-xl bg-[#21759B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <SiWordpress className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  WordPress Development
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Creating custom WordPress themes and solutions for
                  content-driven websites and blogs.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group">
                <div className="w-16 h-16 rounded-xl bg-gray-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <SiNextdotjs className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Custom Web Apps
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Developing scalable web applications with full-stack
                  capabilities and modern architectures.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">
              Latest Blog Posts
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Thoughts, tutorials, and insights on web development
            </p>
          </div>

          {posts.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10 max-w-7xl mx-auto">
              {posts.map((post) => {
                const featuredImage = post.featuredImage as Media | null;
                const categories = Array.isArray(post.categories)
                  ? post.categories
                  : [];

                return (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full group overflow-hidden border border-gray-200 hover:border-gray-300 transition-all bg-white shadow-sm hover:shadow-md">
                      {featuredImage?.url && (
                        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-light">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.publishedAt &&
                            new Date(post.publishedAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                        </div>
                        <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {post.title}
                        </CardTitle>
                        {post.excerpt && (
                          <CardDescription className="line-clamp-2 text-gray-600 font-light">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {categories.slice(0, 2).map((cat, idx) => {
                            const category =
                              typeof cat === 'object' &&
                              cat !== null &&
                              'name' in cat
                                ? cat.name
                                : null;
                            return category ? (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 border-0 font-normal text-xs"
                              >
                                {category}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Read All Posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            </>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="bg-gray-50 rounded-2xl p-12 border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Blog Posts Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay tuned for upcoming articles, tutorials, and insights on web development.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Visit Blog Page
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <FadeIn delay={0}>
            <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-br-2xl font-medium text-sm mb-4">
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 uppercase tracking-tight">
              Let's Work Together
            </h2>
            <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto font-light">
              Interested in collaborating or have a project in mind? Let's
              create something amazing together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
