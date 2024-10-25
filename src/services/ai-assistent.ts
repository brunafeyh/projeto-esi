import apiInstance from '../shared/api';
import { ChatRequest, ChatResponse, TranscribeAudioRequest, TranscribeAudioResponse } from '../types/ai-assistent';

class AiAssistantService {
  private apiUrl: string;

  constructor(apiUrl: string = `/ai-assistant`) {
    this.apiUrl = apiUrl;
  }

  async transcribeAudio(transcribeData: TranscribeAudioRequest): Promise<TranscribeAudioResponse> {
    const response = await apiInstance.get<TranscribeAudioResponse>(`${this.apiUrl}/transcribe-audio`, {
      params: transcribeData,
    });
    return response.data;
  }


  async handleChatMessage(chatData: ChatRequest): Promise<ChatResponse> {
    const response = await apiInstance.post(`${this.apiUrl}/chat`, chatData);
    return response.data;
  }
}

export default AiAssistantService;
