import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

interface Mensaje {
  de: 'usuario' | 'bot';
  texto: string;
}

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  standalone: false
})
export class ChatWidgetComponent {
  estaAbierta = false;
  entrada = '';
  mensajes: Mensaje[] = [];

  constructor(private servicioChat: ChatService) {}

  alternar() {
    this.estaAbierta = !this.estaAbierta;
  }

  enviar() {
    const texto = this.entrada.trim();
    if (!texto) {
      return;
    }

    this.mensajes.push({ de: 'usuario', texto });
    this.entrada = '';

    this.servicioChat.sendMessage(texto).subscribe({
      next: ({ reply }) => {
        this.mensajes.push({ de: 'bot', texto: reply });
      },
      error: () =>
        this.mensajes.push({
          de: 'bot',
          texto: 'Error al conectar con el bot.'
        })
    });
  }
}
