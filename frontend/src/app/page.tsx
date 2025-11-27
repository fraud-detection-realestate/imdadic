import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
import {
  SITE_CONFIG,
  NAVIGATION_LINKS,
  HERO_CONTENT,
  FEATURE_CARDS,
  DATASET_CONTENT,
  CTA_SECTION,
  FOOTER_CONTENT,
} from "@/constants/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/IGAC-logo.jpeg"
              alt="Logo Instituto Geográfico Agustín Codazzi"
              width={56}
              height={56}
              className="rounded-xl object-contain shadow-sm"
            />
            <div>
              <h1 className="text-base font-bold text-blue-900">
                {SITE_CONFIG.fullName}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                {SITE_CONFIG.subtitle}
              </p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-slate-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-900 rounded-full text-sm font-semibold shadow-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                {HERO_CONTENT.badge}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                {HERO_CONTENT.title.prefix}{" "}
                <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  {HERO_CONTENT.title.highlight}
                </span>{" "}
                {HERO_CONTENT.title.suffix}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {HERO_CONTENT.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href={HERO_CONTENT.cta.primary.href}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {HERO_CONTENT.cta.primary.label}
                  <Icon name="trending" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={HERO_CONTENT.cta.secondary.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
                >
                  {HERO_CONTENT.cta.secondary.label}
                  <Icon name="map" className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              {FEATURE_CARDS.map((feature) => (
                <div
                  key={feature.id}
                  className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon name={feature.icon} className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Alcance del Sistema
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Monitoreo integral de la actividad inmobiliaria en Colombia
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-2">34M+</div>
                  <p className="text-blue-100">Registros de transacciones</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-2">1,105</div>
                  <p className="text-blue-100">Municipios cubiertos</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-2">2015-2025</div>
                  <p className="text-blue-100">Período de análisis</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold text-white mb-2">24/7</div>
                  <p className="text-blue-100">Monitoreo continuo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-900 rounded-full text-sm font-semibold mb-6">
              <Icon name="database" className="w-4 h-4" />
              Tecnología de Vanguardia
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Solución Tecnológica Integral
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Sistema construido con las mejores prácticas de análisis de datos,
              inteligencia artificial y visualización geoespacial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Icon name="trending" className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Machine Learning
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Algoritmos avanzados de detección de anomalías y patrones inusuales
                basados en modelos estadísticos y aprendizaje automático
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Icon name="map" className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Análisis Geoespacial
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Visualización interactiva de datos inmobiliarios con capas de calor,
                clústeres y análisis territorial avanzado
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Icon name="lightbulb" className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Asistente IA
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Agente conversacional inteligente para consultas, análisis y
                generación de insights sobre anomalías detectadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon name="database" className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    {DATASET_CONTENT.title}
                  </h2>
                  <p className="text-lg text-slate-600">
                    Información oficial del Instituto Geográfico Agustín Codazzi
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {DATASET_CONTENT.dataset.name}
                    </h3>
                    <p className="text-slate-700 mb-4">
                      {DATASET_CONTENT.dataset.source}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
                        <Icon name="chart" className="w-4 h-4 text-blue-600" />
                        34M+ registros
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
                        <Icon name="map" className="w-4 h-4 text-blue-600" />
                        1,105 municipios
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
                        <Icon name="clock" className="w-4 h-4 text-blue-600" />
                        2015 - 2025
                      </span>
                    </div>
                  </div>
                  <a
                    href={DATASET_CONTENT.dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex-shrink-0"
                  >
                    Acceder al Dataset
                    <Icon name="trending" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-semibold mb-8">
              <Icon name="lightbulb" className="w-4 h-4" />
              Sistema en operación
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {CTA_SECTION.title}
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              {CTA_SECTION.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={CTA_SECTION.buttons.primary.href}
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                {CTA_SECTION.buttons.primary.label}
                <Icon name="chart" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={CTA_SECTION.buttons.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                {CTA_SECTION.buttons.secondary.label}
                <Icon name="map" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Logo and description */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/IGAC-logo.jpeg"
                    alt="Logo IGAC"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-bold text-white text-sm">
                      {FOOTER_CONTENT.organization}
                    </p>
                    <p className="text-xs text-slate-500">IGAC</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Sistema de Monitoreo y Detección de Anomalías en Dinámica Inmobiliaria
                </p>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-1">
                <h4 className="text-white font-semibold mb-4 text-sm">
                  Acceso Rápido
                </h4>
                <nav className="space-y-2">
                  {NAVIGATION_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact Info */}
              <div className="md:col-span-1">
                <h4 className="text-white font-semibold mb-4 text-sm">
                  Información
                </h4>
                <div className="space-y-2 text-sm">
                  <p>{FOOTER_CONTENT.location}</p>
                  <p className="text-slate-500">
                    Sistema desarrollado para el análisis y monitoreo
                    de la actividad inmobiliaria en Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">
                {FOOTER_CONTENT.copyright}
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-slate-500 hover:text-white transition-colors">
                  Términos de uso
                </a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors">
                  Privacidad
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}