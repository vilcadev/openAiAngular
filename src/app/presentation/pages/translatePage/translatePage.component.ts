import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@Components/index';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxSelectComponent
  ],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public languages = signal(
    [
      { id: 'alemán', text: 'Alemán' },
      { id: 'árabe', text: 'Árabe' },
      { id: 'bengalí', text: 'Bengalí' },
      { id: 'francés', text: 'Francés' },
      { id: 'hindi', text: 'Hindi' },
      { id: 'inglés', text: 'Inglés' },
      { id: 'japonés', text: 'Japonés' },
      { id: 'mandarín', text: 'Mandarín' },
      { id: 'portugués', text: 'Portugués' },
      { id: 'ruso', text: 'Ruso' },
    ]);





  handleMessageWithSelect({prompt, selectedOption}: TextMessageBoxEvent){
    this.isLoading.set(true);

    const message = `Traduce a ${ selectedOption }:${prompt}`;

    // Mostramos al Usuario su mensaje que envió
    this.messages.update( (prev)=>[
      ...prev,
      {
        isGpt:false,
        text:message
      }
    ]);

    // Llamamos a OpenAi
    this.openAiService.translateText( prompt, selectedOption )
    .subscribe(resp =>{
      this.isLoading.set(false);
      this.messages.update( prev => [
        ...prev,
        {
          isGpt:true,
          text:resp.message,
        }
      ])
    });
  }
 }
