export interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent {
    error: string;
}

export interface Message {
    text: string;
    sender: 'user' | 'bot';
}

export const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
export type SpeechRecognitionType = typeof SpeechRecognition;