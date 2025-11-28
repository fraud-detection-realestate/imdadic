import React from 'react';

export const FloatingParticles = () => {
    // Generar partículas con posiciones y retardos aleatorios pero deterministas para SSR
    const particles = [
        { type: 'circle', size: 'w-4 h-4', left: '10%', top: '20%', delay: '0s', duration: '15s', color: 'bg-blue-200' },
        { type: 'square', size: 'w-6 h-6', left: '80%', top: '15%', delay: '2s', duration: '20s', color: 'bg-blue-100' },
        { type: 'circle', size: 'w-3 h-3', left: '30%', top: '60%', delay: '5s', duration: '18s', color: 'bg-blue-300' },
        { type: 'square', size: 'w-5 h-5', left: '70%', top: '80%', delay: '1s', duration: '25s', color: 'bg-blue-50' },
        { type: 'circle', size: 'w-8 h-8', left: '50%', top: '40%', delay: '3s', duration: '30s', color: 'bg-blue-100/50' },
        { type: 'square', size: 'w-4 h-4', left: '20%', top: '90%', delay: '7s', duration: '22s', color: 'bg-blue-200/30' },
        { type: 'circle', size: 'w-2 h-2', left: '90%', top: '50%', delay: '4s', duration: '12s', color: 'bg-blue-400/20' },
        { type: 'square', size: 'w-3 h-3', left: '15%', top: '30%', delay: '6s', duration: '17s', color: 'bg-blue-300/40' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, index) => (
                <div
                    key={index}
                    className={`absolute ${particle.size} ${particle.color} ${particle.type === 'circle' ? 'rounded-full' : 'rounded-md'} opacity-40 animate-float`}
                    style={{
                        left: particle.left,
                        top: particle.top,
                        animationDelay: particle.delay,
                        animationDuration: particle.duration,
                    }}
                />
            ))}

            {/* Elementos flotantes adicionales con movimiento de deriva */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl animate-drift" style={{ animationDuration: '40s' }} />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-50/30 to-transparent rounded-full blur-3xl animate-drift" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />
        </div>
    );
};
