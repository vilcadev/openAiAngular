import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMesaggeBoxComponent, TextMessageStreamBoxComponent } from '@Components/index';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMesaggeBoxComponent,
    TextMessageStreamBoxComponent
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  // Ojo esta señal AbortController no tiene nada que ver con AbortSignal
  // El AbortSignal(no es una señal) es puramente de typescript, mas no de Angular
  public abortSignal = new AbortController()

  async handleMessage(prompt:string){

    this.abortSignal.abort();
    this.abortSignal = new AbortController(); //Creamos una nueva Señal
    // Mostramos al Usuario su mensaje que envió
    this.messages.update( prev=>[
      ...prev,
      {
        isGpt:false,
        text:prompt
      },
      {
        isGpt:true,
        text:'...'
      }
    ]);

    this.isLoading.set(true);

    // Llamamos a OpenAi
    const stream = this.openAiService.prosConsStreamDiscusser(prompt, this.abortSignal.signal);

      this.isLoading.set(false);
      for await (const text of stream){
        this.handleStreamResponse(text);
      }
  }

  handleStreamResponse( message:string ){

    this.messages().pop(); //Removemos el último elemento(en este caso los ... de OpenAI)
    const messages = this.messages();

    this.messages.set([ ...messages,{isGpt:true, text:message} ]);

  }

  handleAbortSignal(){
    this.abortSignal.abort();
  }
}
