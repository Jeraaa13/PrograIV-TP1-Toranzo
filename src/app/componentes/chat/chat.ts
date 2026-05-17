import { Component, signal, inject } from '@angular/core';
import { Auth } from '../../servicios/auth';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../servicios/supabase';
import { OnInit, OnDestroy } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Mensaje } from '../../interfaces/mensaje';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnDestroy {
  chatAbierto = signal(false);
  mensajes = signal<Mensaje[]>([]);
  mensaje = signal('');
  authService = inject(Auth);
  supabaseService = inject(SupabaseService);
  private channel: RealtimeChannel | undefined;
  nombresUsuarios = signal<Record<string, string>>({});

  async ngOnInit() {
    const data = (await this.supabaseService.traerMensajeData()) ?? [];
    this.mensajes.set(data);

    const idsUnicos = [...new Set(data.map((m) => m.idUsuario).filter(Boolean))];
    for (const id of idsUnicos) {
      const u = await this.authService.getUserDataById(id);
      this.nombresUsuarios.update((c) => ({ ...c, [id!]: u.nombre }));
    }

    this.channel = this.supabaseService.supabase
      .channel('chat-global')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, (payload) => {
        const nuevo = payload.new as Mensaje;
        this.mensajes.update((a) => [...a, nuevo]);

        if (nuevo.idUsuario && !this.nombresUsuarios()[nuevo.idUsuario]) {
          setTimeout(async () => {
            const u = await this.authService.getUserDataById(nuevo.idUsuario);
            this.nombresUsuarios.update((c) => ({ ...c, [nuevo.idUsuario!]: u.nombre }));
          }, 0);
        }
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.channel?.unsubscribe();
  }

  toggleChat() {
    this.chatAbierto.update((v) => !v);
  }

  enviarMensaje() {
    const texto = this.mensaje().trim();
    if (!texto) return;
    this.supabaseService.saveMensajeData({
      idUsuario: this.authService.usuario()?.id,
      mensaje: texto,
    });
    this.mensaje.set('');
  }
}
