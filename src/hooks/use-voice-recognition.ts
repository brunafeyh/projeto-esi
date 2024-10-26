import { useState, useRef, useCallback } from 'react';
import { TranscribeAudioRequest } from '../types/ai-assistent';
import AiAssistantService from '../services/ai-assistent';

export const useVoiceRecognition = (
    onTranscription: (transcript: string) => void,
    onError: (error: string) => void
) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const aiAssistantService = new AiAssistantService();

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.start();
            setIsRecording(true);

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                const audioBlob = new Blob([event.data], { type: 'audio/mp3' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                transcribeAudio(audioBlob); 
            };

            mediaRecorder.onstop = () => {
                setIsRecording(false);
            };
        } catch (error) {
            console.error('Error accessing microphone:', error);
            onError('Could not access the microphone.');
        }
    }, [onError]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    }, []);

    const cancelRecording = useCallback(() => {
        setAudioURL(null);
        setIsRecording(false);
    }, []);

    const transcribeAudio = useCallback(
        async (audioBlob: Blob) => {
            try {
                const transcribeData: TranscribeAudioRequest = { file: audioBlob };
                console.log(audioBlob)
                console.log(transcribeData)
                const response = await aiAssistantService.transcribeAudio(transcribeData);
                console.log(response)
                onTranscription(response);
            } catch (error) {
                console.error('Error during transcription:', error);
                onError('Could not transcribe the audio.');
            }
        },
        [onTranscription, onError]
    );

    return {
        isRecording,
        audioURL,
        startRecording,
        stopRecording,
        cancelRecording,
    };
};
