import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private backendUrl = 'https://chatbot-back-7gik.onrender.com/'; // URL do backend FastAPI

  constructor(private http: HttpClient) {}

  enviarMensagem(mensagem: string, historico: any[]): Observable<any> {
    const payload = { mensagem, historico };
    return this.http.post<any>(this.backendUrl, payload);
  }
}
