import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
import {
  SITE_CONFIG,
  NAVIGATION_LINKS,
  HERO_CONTENT,
  FEATURE_CARDS,
  CHALLENGE_CONTENT,
  OBJECTIVES_CONTENT,
  IMPACT_CONTENT,
  DATASET_CONTENT,
  CTA_SECTION,
  FOOTER_CONTENT,
} from "@/constants/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/IGAC-logo.jpeg"
              alt="Logo IGAC"
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />
            <div>
              <h1 className="text-sm font-bold text-blue-900">{SITE_CONFIG.fullName}</h1>
              <p className="text-xs text-gray-600">{SITE_CONFIG.subtitle}</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-700 hover:text-blue-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
            {HERO_CONTENT.badge}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            {HERO_CONTENT.title.prefix}{" "}
            <span className="text-blue-900">{HERO_CONTENT.title.highlight}</span>{" "}
            {HERO_CONTENT.title.suffix}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {HERO_CONTENT.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={HERO_CONTENT.cta.primary.href}
              className="px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              {HERO_CONTENT.cta.primary.label}
            </Link>
            <Link
              href={HERO_CONTENT.cta.secondary.href}
              className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              {HERO_CONTENT.cta.secondary.label}
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {FEATURE_CARDS.map((feature) => (
            <div key={feature.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon name={feature.icon} className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge Section */}
      <section id="challenge" className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="lightbulb" className="w-8 h-8 text-yellow-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{CHALLENGE_CONTENT.title}</h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            {CHALLENGE_CONTENT.paragraphs.map((para, index) => (
              <p key={index} className="text-lg leading-relaxed mt-4">
                {para.text} <strong className="text-gray-900">{para.highlight}</strong> {para.textContinue}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Objetivo General */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="target" className="w-8 h-8 text-blue-900" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{OBJECTIVES_CONTENT.general.title}</h2>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-12">
            <p className="text-lg text-gray-800 italic">
              {OBJECTIVES_CONTENT.general.description}
            </p>
          </div>

          {/* Objetivos Específicos */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="checklist" className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{OBJECTIVES_CONTENT.specific.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {OBJECTIVES_CONTENT.specific.items.map((obj, index) => (
              <div key={index} className="flex gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="trending" className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">{IMPACT_CONTENT.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {IMPACT_CONTENT.items.map((impact, index) => (
              <div key={index} className="flex gap-3 items-start">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-blue-50">{impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="database" className="w-8 h-8 text-indigo-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{DATASET_CONTENT.title}</h2>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {DATASET_CONTENT.dataset.name}
                </h3>
                <p className="text-gray-600">{DATASET_CONTENT.dataset.source}</p>
              </div>
              <a
                href={DATASET_CONTENT.dataset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all flex-shrink-0"
              >
                Ver Dataset
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {CTA_SECTION.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {CTA_SECTION.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={CTA_SECTION.buttons.primary.href}
              className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
            >
              {CTA_SECTION.buttons.primary.label}
            </Link>
            <Link
              href={CTA_SECTION.buttons.secondary.href}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              {CTA_SECTION.buttons.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-semibold text-white mb-1">{FOOTER_CONTENT.organization}</p>
              <p className="text-sm">{FOOTER_CONTENT.systemName}</p>
            </div>
            <div className="text-center md:text-right text-sm">
              <p>{FOOTER_CONTENT.copyright}</p>
              <p className="mt-1">{FOOTER_CONTENT.location}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}