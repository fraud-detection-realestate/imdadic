import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, MapPin, Calendar, DollarSign, Users, Eye } from 'lucide-react';

// Datos simulados de alertas de fraude (movido fuera del componente para evitar re-renders)
const FRAUD_ALERTS = [
    {
        id: 1,
        type: 'Atomización',
        severity: 'high',
        title: 'Posible Lavado de Dinero Detectado',
        description: '12 compradores adquirieron el mismo predio en menos de 24 horas',
        location: 'Medellín, Antioquia',
        date: '2024-01-15',
        value: 1200000000,
        buyers: 12,
        sellers: 1,
        confidence: 94,
        matricula: '05001-001-123456'
    },
    {
        id: 2,
        type: 'Sobrevaloración',
        severity: 'critical',
        title: 'Valor 500% Sobre el Promedio de Mercado',
        description: 'Transacción con valor atípico comparado con zona y tipo de predio',
        location: 'Envigado, Antioquia',
        date: '2024-01-14',
        value: 5400000000,
        buyers: 1,
        sellers: 1,
        confidence: 98,
        matricula: '05266-033-789012'
    },
    {
        id: 3,
        type: 'Transacciones Rápidas',
        severity: 'medium',
        title: 'Rotación Acelerada de Propiedad',
        description: 'Mismo predio vendido 4 veces en 45 días',
        location: 'Rionegro, Antioquia',
        date: '2024-01-13',
        value: 850000000,
        buyers: 4,
        sellers: 4,
        confidence: 87,
        matricula: '05615-020-345678'
    },
    {
        id: 4,
        type: 'Subvaluación',
        severity: 'high',
        title: 'Compraventa con Valor Sospechosamente Bajo',
        description: 'Valor declarado 80% inferior al avalúo catastral',
        location: 'Sabaneta, Antioquia',
        date: '2024-01-12',
        value: 25000000,
        buyers: 1,
        sellers: 1,
        confidence: 91,
        matricula: '05631-002-901234'
    },
    {
        id: 5,
        type: 'Red de Testaferros',
        severity: 'critical',
        title: 'Patrón de Concentración Detectado',
        description: '8 vendedores diferentes transfieren a 1 mismo comprador',
        location: 'La Estrella, Antioquia',
        date: '2024-01-11',
        value: 3200000000,
        buyers: 1,
        sellers: 8,
        confidence: 96,
        matricula: '05380-015-567890'
    }
];

const FraudAlertsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-[var(--danger-50)] text-[var(--danger-700)] border-[var(--danger-100)]';
            case 'high': return 'bg-[var(--warning-50)] text-[var(--warning-700)] border-[var(--warning-100)]';
            case 'medium': return 'bg-[var(--info-50)] text-[var(--info-700)] border-[var(--info-100)]';
            default: return 'bg-[var(--gray-50)] text-[var(--gray-700)] border-[var(--gray-200)]';
        }
    };

    const formatCurrency = (value: number) => {
        return `$${(value / 1000000).toLocaleString('es-CO')}M`;
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % FRAUD_ALERTS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]); // Eliminada la dependencia alerts.length

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + FRAUD_ALERTS.length) % FRAUD_ALERTS.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % FRAUD_ALERTS.length);
    };

    const goToSlide = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    const currentAlert = FRAUD_ALERTS[currentIndex];

    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-[var(--igac-blue-100)] overflow-hidden">
                {/* Header con colores IGAC */}
                <div className="bg-gradient-to-r from-[var(--igac-blue-900)] to-[var(--igac-blue-800)] px-6 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Alertas de Fraude Recientes</h2>
                        </div>
                        <div className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                            <div className="w-2 h-2 bg-[var(--danger-500)] rounded-full animate-pulse shadow-[0_0_10px_var(--danger-500)]"></div>
                            <span className="font-medium">{FRAUD_ALERTS.length} alertas activas</span>
                        </div>
                    </div>
                </div>

                {/* Carousel Content */}
                <div className="relative bg-gradient-to-br from-white to-[var(--igac-blue-50)] p-8">
                    {/* Alert Card */}
                    <div className="transition-all duration-500 ease-in-out">
                        {/* Severity Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getSeverityColor(currentAlert.severity)} shadow-sm`}>
                                {currentAlert.type}
                            </span>
                            <span className="px-3 py-1 bg-[var(--igac-blue-100)] text-[var(--igac-blue-800)] border border-[var(--igac-blue-200)] rounded-full text-sm font-medium">
                                Confianza: {currentAlert.confidence}%
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-[var(--gray-900)] mb-3">
                            {currentAlert.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[var(--gray-600)] text-lg mb-6 leading-relaxed">
                            {currentAlert.description}
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow">
                                <div className="p-2 bg-[var(--igac-blue-50)] rounded-lg">
                                    <MapPin className="w-5 h-5 text-[var(--igac-blue-600)]" />
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--gray-500)] font-medium uppercase tracking-wider">Ubicación</p>
                                    <p className="text-sm font-bold text-[var(--gray-900)]">{currentAlert.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow">
                                <div className="p-2 bg-[var(--success-50)] rounded-lg">
                                    <Calendar className="w-5 h-5 text-[var(--success-600)]" />
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--gray-500)] font-medium uppercase tracking-wider">Fecha</p>
                                    <p className="text-sm font-bold text-[var(--gray-900)]">
                                        {new Date(currentAlert.date).toLocaleDateString('es-CO')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow">
                                <div className="p-2 bg-[var(--warning-50)] rounded-lg">
                                    <DollarSign className="w-5 h-5 text-[var(--warning-600)]" />
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--gray-500)] font-medium uppercase tracking-wider">Valor</p>
                                    <p className="text-sm font-bold text-[var(--gray-900)]">{formatCurrency(currentAlert.value)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Users className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--gray-500)] font-medium uppercase tracking-wider">Intervinientes</p>
                                    <p className="text-sm font-bold text-[var(--gray-900)]">
                                        {currentAlert.buyers}C / {currentAlert.sellers}V
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Matricula */}
                        <div className="p-4 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-200)] mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[var(--gray-500)] mb-1 font-medium uppercase tracking-wider">Matrícula Inmobiliaria</p>
                                <p className="text-lg font-mono font-bold text-[var(--gray-900)] tracking-wide">{currentAlert.matricula}</p>
                            </div>
                            <div className="hidden md:block">
                                <span className="px-3 py-1 bg-white border border-[var(--gray-200)] rounded-lg text-xs font-mono text-[var(--gray-500)]">ID: {currentAlert.id}</span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] text-white font-bold rounded-xl hover:from-[var(--igac-blue-800)] hover:to-[var(--igac-blue-900)] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            <Eye className="w-5 h-5" />
                            Ver Detalles Completos
                        </button>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg border border-[var(--gray-100)] hover:bg-[var(--gray-50)] hover:scale-110 transition-all text-[var(--gray-700)] hover:text-[var(--igac-blue-700)]"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg border border-[var(--gray-100)] hover:bg-[var(--gray-50)] hover:scale-110 transition-all text-[var(--gray-700)] hover:text-[var(--igac-blue-700)]"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Footer with Dots */}
                <div className="bg-[var(--gray-50)] px-8 py-4 border-t border-[var(--gray-200)]">
                    <div className="flex items-center justify-between">
                        {/* Dots Navigation */}
                        <div className="flex items-center gap-2">
                            {FRAUD_ALERTS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`transition-all duration-300 rounded-full ${index === currentIndex
                                        ? 'w-8 h-2.5 bg-[var(--igac-blue-600)]'
                                        : 'w-2.5 h-2.5 bg-[var(--gray-300)] hover:bg-[var(--gray-400)]'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Counter and Auto-play Toggle */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-[var(--gray-600)]">
                                {currentIndex + 1} / {FRAUD_ALERTS.length}
                            </span>
                            <button
                                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors uppercase tracking-wide ${isAutoPlaying
                                    ? 'bg-[var(--igac-blue-100)] text-[var(--igac-blue-800)]'
                                    : 'bg-[var(--gray-200)] text-[var(--gray-700)]'
                                    }`}
                            >
                                {isAutoPlaying ? 'Pausar' : 'Reproducir'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-[var(--danger-100)] text-center hover:shadow-lg transition-shadow">
                    <p className="text-4xl font-extrabold text-[var(--danger-600)] mb-1">
                        {FRAUD_ALERTS.filter(a => a.severity === 'critical').length}
                    </p>
                    <p className="text-sm font-bold text-[var(--gray-600)] uppercase tracking-wider">Críticas</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-[var(--warning-100)] text-center hover:shadow-lg transition-shadow">
                    <p className="text-4xl font-extrabold text-[var(--warning-600)] mb-1">
                        {FRAUD_ALERTS.filter(a => a.severity === 'high').length}
                    </p>
                    <p className="text-sm font-bold text-[var(--gray-600)] uppercase tracking-wider">Altas</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-[var(--info-100)] text-center hover:shadow-lg transition-shadow">
                    <p className="text-4xl font-extrabold text-[var(--info-600)] mb-1">
                        {FRAUD_ALERTS.filter(a => a.severity === 'medium').length}
                    </p>
                    <p className="text-sm font-bold text-[var(--gray-600)] uppercase tracking-wider">Medias</p>
                </div>
            </div>
        </div>
    );
};

export default FraudAlertsCarousel;
