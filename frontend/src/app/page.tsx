"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const [activeFeature, setActiveFeature] = useState<number>(0);

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

          {/* Quick Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logos Institucionales */}
          <div className="hidden lg:flex items-center gap-6">
            <Image
              src="/gobierno-colombia-logo.png"
              alt="Gobierno de Colombia"
              width={60}
              height={60}
              className="rounded-lg object-contain hover:scale-110 transition-transform cursor-pointer"
            />
            <div className="w-px h-12 bg-slate-300/50" />
            <Image
              src="/programa-logo.png"
              alt="Programa"
              width={60}
              height={60}
              className="rounded-lg object-contain hover:scale-110 transition-transform cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* Hero Section - MEJORADO */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-slate-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-900 rounded-full text-sm font-semibold shadow-sm animate-bounce-slow">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                {HERO_CONTENT.badge}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-fade-in">
                {HERO_CONTENT.title.prefix}{" "}
                <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  {HERO_CONTENT.title.highlight}
                </span>{" "}
                {HERO_CONTENT.title.suffix}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {HERO_CONTENT.description}
              </p>

              {/* CTA Buttons - MEJORADOS con iconos */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href={HERO_CONTENT.cta.primary.href}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-bold hover:from-blue-800 hover:to-blue-700 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
                >
                  <span className="text-2xl">🔍</span>
                  {HERO_CONTENT.cta.primary.label}
                  <Icon
                    name="trending"
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href={HERO_CONTENT.cta.secondary.href}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-900 border-2 border-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <span className="text-2xl">📊</span>
                  {HERO_CONTENT.cta.secondary.label}
                  <Icon
                    name="chart"
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* Interactive Feature Preview - NUEVO */}
            <div className="mt-20 grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🎯",
                  title: "Detección Inteligente",
                  desc: "Modelos ML entrenados",
                  href: "/detection",
                },
                {
                  icon: "🗺️",
                  title: "Mapas Interactivos",
                  desc: "Visualización geoespacial",
                  href: "/maps",
                },
                {
                  icon: "🤖",
                  title: "Asistente IA",
                  desc: "Consultas en lenguaje natural",
                  href: "/chat",
                },
              ].map((feature, idx) => (
                <Link
                  key={idx}
                  href={feature.href}
                  onMouseEnter={() => setActiveFeature(idx)}
                  className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${activeFeature === idx
                      ? "border-blue-500 shadow-xl shadow-blue-500/30"
                      : "border-slate-200 hover:border-blue-300"
                    }`}
                >
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Explorar
                    <Icon name="trending" className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - MEJORADO con animaciones */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
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
              {[
                { value: "34M+", label: "Registros de transacciones", icon: "📊" },
                { value: "1,105", label: "Municipios cubiertos", icon: "🏛️" },
                { value: "2015-2025", label: "Período de análisis", icon: "📅" },
                { value: "24/7", label: "Monitoreo continuo", icon: "⚡" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center group hover:scale-110 transition-transform duration-300"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:shadow-2xl hover:shadow-white/20">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <p className="text-blue-100 text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section - NUEVO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold mb-6">
              <span className="text-xl">💡</span>
              Capacidades del Sistema
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Qué puedes hacer con IMDADIC?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explora las poderosas herramientas de análisis inmobiliario
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🔍",
                title: "Analizar Transacciones",
                description:
                  "Clasifica el rango de precio y detecta anomalías en transacciones inmobiliarias usando modelos de Machine Learning",
                features: ["Clasificación de precio", "Detección de fraude", "Análisis en segundos"],
                href: "/detection",
                color: "blue",
              },
              {
                icon: "📊",
                title: "Visualizar Datos",
                description:
                  "Dashboard ejecutivo con KPIs, tendencias temporales y distribución geográfica de anomalías detectadas",
                features: ["KPIs en tiempo real", "Gráficos interactivos", "Filtros avanzados"],
                href: "/dashboard",
                color: "indigo",
              },
              {
                icon: "🗺️",
                title: "Explorar Mapas",
                description:
                  "Visualización geoespacial interactiva de anomalías por municipio con capas de calor y clustering",
                features: ["Mapas interactivos", "Filtros geográficos", "Análisis territorial"],
                href: "/maps",
                color: "green",
              },
              {
                icon: "🤖",
                title: "Consultar con IA",
                description:
                  "Asistente conversacional inteligente para hacer preguntas sobre anomalías y obtener insights",
                features: ["Consultas en lenguaje natural", "Respuestas contextuales", "Análisis profundo"],
                href: "/chat",
                color: "purple",
              },
            ].map((capability, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br from-${capability.color}-50 to-white p-8 rounded-2xl border-2 border-${capability.color}-200 hover:border-${capability.color}-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {capability.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {capability.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {capability.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6">
                  {capability.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${capability.color}-600`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={capability.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-${capability.color}-600 text-white rounded-xl font-semibold hover:bg-${capability.color}-700 transition-all group-hover:gap-3 shadow-lg hover:shadow-xl`}
                >
                  Comenzar
                  <Icon name="trending" className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
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
            {[
              {
                icon: "trending",
                title: "Machine Learning",
                description:
                  "Algoritmos avanzados de detección de anomalías y patrones inusuales basados en modelos estadísticos y aprendizaje automático",
                color: "blue",
              },
              {
                icon: "map",
                title: "Análisis Geoespacial",
                description:
                  "Visualización interactiva de datos inmobiliarios con capas de calor, clústeres y análisis territorial avanzado",
                color: "purple",
              },
              {
                icon: "lightbulb",
                title: "Asistente IA",
                description:
                  "Agente conversacional inteligente para consultas, análisis y generación de insights sobre anomalías detectadas",
                color: "green",
              },
            ].map((tech, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br from-${tech.color}-50 to-${tech.color === "blue" ? "indigo" : tech.color}-50 p-8 rounded-2xl border border-${tech.color}-200 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group`}
              >
                <div className={`w-16 h-16 bg-${tech.color}-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                  <Icon name={tech.icon as any} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{tech.title}</h3>
                <p className="text-slate-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon name="database" className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {DATASET_CONTENT.title}
                  </h2>
                  <p className="text-lg text-blue-100 mb-6">
                    Información oficial del Instituto Geográfico Agustín Codazzi
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {DATASET_CONTENT.dataset.name}
                    </h3>
                    <p className="text-blue-100 mb-4">{DATASET_CONTENT.dataset.source}</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: "chart", text: "34M+ registros" },
                        { icon: "map", text: "1,105 municipios" },
                        { icon: "clock", text: "2015 - 2025" },
                      ].map((stat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium text-white border border-white/30"
                        >
                          <Icon name={stat.icon as any} className="w-4 h-4" />
                          {stat.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={DATASET_CONTENT.dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-white/20"
                  >
                    <span className="text-xl">📊</span>
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
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-900/50" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-semibold mb-8 animate-pulse">
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
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                <span className="text-2xl">🔍</span>
                {CTA_SECTION.buttons.primary.label}
                <Icon name="chart" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={CTA_SECTION.buttons.secondary.href}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <span className="text-2xl">📊</span>
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
                <h4 className="text-white font-semibold mb-4 text-sm">Acceso Rápido</h4>
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
                <h4 className="text-white font-semibold mb-4 text-sm">Información</h4>
                <div className="space-y-2 text-sm">
                  <p>{FOOTER_CONTENT.location}</p>
                  <p className="text-slate-500">
                    Sistema desarrollado para el análisis y monitoreo de la actividad
                    inmobiliaria en Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">{FOOTER_CONTENT.copyright}</p>
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

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}