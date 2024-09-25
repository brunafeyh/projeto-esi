import { useState, useRef, useCallback } from 'react';
import { SpeechRecognition, SpeechRecognitionErrorEvent, SpeechRecognitionEvent, SpeechRecognitionType } from '../types/chat';

export const useVoiceRecognition = (onTranscription: (transcript: string) => void, onError: (error: string) => void) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(null);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.start();
            setIsRecording(true);

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                const audioBlob = new Blob([event.data], { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
            };

            mediaRecorder.onstop = () => {
                setIsRecording(false);
                handleVoiceRecognition();
            };
        } catch (error) {
            console.error('Erro ao acessar o microfone:', error);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    }, []);

    const cancelRecording = useCallback(() => {
        setAudioURL(null);
        setIsRecording(false);
    }, []);

    const handleVoiceRecognition = useCallback(() => {
        if (!SpeechRecognition) {
            alert('Seu navegador não suporta reconhecimento de voz.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[0]?.[0]?.transcript;

            if (result && result.trim()) {
                onTranscription(result);
            } else {
                onError('Desculpe, não entendi o que foi dito');
            }
        };

        recognition.onerror = (error: SpeechRecognitionErrorEvent) => {
            console.error('Erro no reconhecimento de voz:', error);
            onError('Desculpe, não entendi o que foi dito');
        };

        recognitionRef.current = recognition;
        recognition.start();
    }, [onTranscription, onError]);

    return {
        isRecording,
        audioURL,
        startRecording,
        stopRecording,
        cancelRecording,
    };
};
