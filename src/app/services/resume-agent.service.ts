import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import type { AgentInputItem } from '@openai/agents';

@Injectable({
  providedIn: 'root'
})
export class ResumeAgentService {
  private http = inject(HttpClient);
  private conversationHistory = signal<AgentInputItem[]>([]);
  private isLoading = signal(false);

  async askQuestion(question: string): Promise<string> {
    this.isLoading.set(true);
    try {
      const response = await firstValueFrom(
        this.http.post<{response: string, history: AgentInputItem[]}>('/api/agentService', {
          question: question,
          history: this.conversationHistory()
        })
      );
      
      // Update the conversation history with the response from the server
      this.conversationHistory.set(response.history);
      return response.response;
    } finally {
      this.isLoading.set(false);
    }
  }
}
