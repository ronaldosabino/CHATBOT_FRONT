import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private backendUrl = 'http://localhost:8000/chat'; // URL do backend FastAPI

  constructor(private http: HttpClient) {}

  enviarMensagem(mensagem: string, historico: any[]): Observable<any> {
    const payload = { mensagem, historico };
    return this.http.post<any>(this.backendUrl, payload);
  }
}
