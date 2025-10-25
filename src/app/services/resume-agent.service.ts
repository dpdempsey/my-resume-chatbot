import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Agent, run, user } from '@openai/agents';
import type { AgentInputItem } from '@openai/agents';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeAgentService {
  private http = inject(HttpClient);
  private conversationId = signal<string | null>(null);
  private isLoading = signal(false);

  async askQuestion(question: string): Promise<string> {
    this.isLoading.set(true);
    try {
      const response = await firstValueFrom(
        this.http.post<{response: string, conversationId: string}>('/api/agentService', {
          question,
          conversationId: this.conversationId()
        })
      );
      
      this.conversationId.set(response.conversationId);
      return response.response;
    } finally {
      this.isLoading.set(false);
    }
  }
}
