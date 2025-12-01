'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import ReactMarkdown from 'react-markdown';

export default function ChatWidget() {
    const {
        isOpen,
        toggleChat,
        messages,
        addMessage,
        sessionId,
        setSessionId,
        isLoading,
        setLoading
    } = useChatStore();

    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Autoscroll al último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Foco en input al abrir
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        // 1. Agregar mensaje del usuario al UI
        addMessage({ role: 'user', content: userMessage });
        setLoading(true);

        try {
            // 2. Enviar al backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/v1/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    session_id: sessionId, // Enviar null si es la primera vez
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la comunicación con el servidor');
            }

            const data = await response.json();

            // 3. Actualizar session_id si es nuevo
            if (data.session_id && data.session_id !== sessionId) {
                setSessionId(data.session_id);
            }

            // 4. Agregar respuesta del asistente
            addMessage({ role: 'assistant', content: data.response });

        } catch (error) {
            console.error('Error enviando mensaje:', error);
            addMessage({
                role: 'assistant',
                content: 'Lo siento, tuve un problema al conectar con el servidor. Por favor intenta de nuevo más tarde.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Ventana de Chat */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Header */}
                    <div className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-md">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Asistente IMDADIC</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse">
                                    </span> En línea
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="Cerrar chat"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Área de Mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                        {messages.length === 0 && (
                            <div className="text-center text-slate-500 mt-10 space-y-2">
                                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot size={32} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <p className="font-medium">¡Hola! Soy tu asistente virtual.</p>
                                <p className="text-sm px-6">
                                    Pregúntame sobre detección de anomalías, precios de predios o estadísticas del sistema.
                                </p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                )}

                                <div
                                    className={`
                                    max-w-[85%] p-3 rounded-2xl text-sm shadow-sm
                                    ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                                        }
                                  `}
                                >
                                    {msg.role === 'assistant' ? (
                                        <div className="markdown-body">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                                    strong: ({ node, ...props }) => <span className="font-bold text-blue-700 dark:text-blue-400" {...props} />,
                                                    ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                                                    li: ({ node, ...props }) => <li className="leading-relaxed pl-1" {...props} />,
                                                    code: ({ node, ...props }) => (
                                                        <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-red-500 dark:text-red-400" {...props} />
                                                    ),
                                                }}
                                            >
                                                {/* Limpieza de caracteres escapados */}
                                                {msg.content.replace(/\\/g, '')}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    )}
                                </div>

                                {
                                    msg.role === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                                            <User size={16} className="text-slate-600 dark:text-slate-300" />
                                        </div>
                                    )
                                }
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                    <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe tu pregunta..."
                                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white placeholder-slate-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl transition-colors shadow-sm flex items-center justify-center"
                                aria-label="Enviar mensaje"
                            >
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                            </button>
                        </form>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-slate-400">
                                IMDADIC AI puede cometer errores. Verifica la información importante.
                            </p>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Botón Flotante (FAB) */}
            <button
                onClick={toggleChat}
                className={`
          p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110
          ${isOpen
                        ? 'bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30'
                    }
        `}
                aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div >
    );
}
