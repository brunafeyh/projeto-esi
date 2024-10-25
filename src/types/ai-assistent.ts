export interface TranscribeAudioRequest {
    file: Blob;
}


export type TranscribeAudioResponse = string


export type ChatRequest = {
    username: string;
    userRole: string;
    userMessage: string;
};

export type ChatResponse = {
    response: string;
    isValidResponse: boolean;
};
