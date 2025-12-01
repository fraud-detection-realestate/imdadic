import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatState {
    isOpen: boolean;
    messages: Message[];
    sessionId: string | null;
    isLoading: boolean;

    // Actions
    toggleChat: () => void;
    setIsOpen: (isOpen: boolean) => void;
    addMessage: (message: Message) => void;
    setSessionId: (id: string) => void;
    setLoading: (loading: boolean) => void;
    clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            isOpen: false,
            messages: [],
            sessionId: null,
            isLoading: false,

            toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
            setIsOpen: (isOpen) => set({ isOpen }),
            addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
            setSessionId: (sessionId) => set({ sessionId }),
            setLoading: (isLoading) => set({ isLoading }),
            clearMessages: () => set({ messages: [] }),
        }),
        {
            name: 'chat-storage', // nombre único para localStorage
            partialize: (state) => ({
                sessionId: state.sessionId,
                messages: state.messages // Opcional: persistir mensajes también si se desea
            }),
        }
    )
);
