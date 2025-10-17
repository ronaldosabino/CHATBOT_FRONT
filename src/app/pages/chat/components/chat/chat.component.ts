import { Component } from '@angular/core';
import { ChatService } from '../../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  mensagem = ''; // Armazena a mensagem do usuário
  historico: any[] = []; // Histórico da conversa
  isLoading: boolean = false;
  menuAberto: boolean = false;

  constructor(private chatService: ChatService) {}

  enviarMensagem() {
    if (!this.mensagem.trim()) return;

    // Ativa o spinner
    this.isLoading = true;

    // Adiciona a mensagem do usuário na interface
    this.historico.push({ role: 'user', content: this.mensagem });

    // Cria um espaço reservado para a resposta do chatbot
    const botMessage = { role: 'assistant', content: '' };
    this.historico.push(botMessage);

    // Envia a mensagem para o backend
    this.chatService.enviarMensagem(this.mensagem, this.historico).subscribe(
      (response) => {
        this.isLoading = false;
        this.simularDigitacao(botMessage, response.resposta);
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao enviar mensagem:', error);
      }
    );

    this.mensagem = '';
  }

  userScrolled: boolean = false; // Flag para monitorar se o usuário mexeu no scroll

  simularDigitacao(botMessage: any, resposta: string) {
    let index = 0;
    const intervalo = setInterval(() => {
      if (index < resposta.length) {
        botMessage.content += resposta[index];
        index++;

        // Atualiza a posição do scroll, mas apenas se o usuário não mexeu
        if (!this.userScrolled) {
          this.scrollToBottom();
        }
      } else {
        clearInterval(intervalo);
      }
    }, 20);
  }

  scrollToBottom() {
    const messagesContainer = document.querySelector(
      '.messages'
    ) as HTMLElement;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Monitorar a interação do usuário com o scroll
  ngAfterViewInit() {
    const messagesContainer = document.querySelector(
      '.messages'
    ) as HTMLElement;
    messagesContainer.addEventListener('scroll', () => {
      const nearBottom =
        messagesContainer.scrollHeight - messagesContainer.scrollTop <=
        messagesContainer.clientHeight + 10;
      this.userScrolled = !nearBottom;
    });
  }

  openCloseMenu() {
    if (this.menuAberto === true) {
      this.menuAberto = false;
    } else {
      this.menuAberto = true;
    }
  }
}
