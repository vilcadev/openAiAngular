
import { ChatMessageComponent, GptMessageOrthographyComponent, MyMessageComponent, TextMesaggeBoxComponent, TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent } from '@Components/index';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';



@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrthographyComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMesaggeBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessage(prompt:string){

    this.isLoading.set(true);

    // Mostramos al Usuario su mensaje que envió
    this.messages.update( (prev)=>[
      ...prev,
      {
        isGpt:false,
        text:prompt
      }
    ]);

    // Llamamos a OpenAi
    this.openAiService.checkOrthography( prompt )
    .subscribe(resp =>{
      this.isLoading.set(false);
      this.messages.update( prev => [
        ...prev,
        {
          isGpt:true,
          text:resp.message,
          info:resp,
        }
      ])
    });
  }

 }
