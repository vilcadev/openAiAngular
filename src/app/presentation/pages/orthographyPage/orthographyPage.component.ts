
import { ChatMessageComponent, MyMessageComponent, TextMesaggeBoxComponent, TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent } from '@Components/index';
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

  public messages = signal<Message[]>([{text:'Hola Mundo', isGpt:false}]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessage(prompt:string){
    console.log({ prompt })

  }

  handleMessageWithFile( {prompt, file}: TextMessageEvent){
    console.log({prompt, file})
  }

  handleMessageWithSelect(event: TextMessageBoxEvent){
    console.log(event);
  }

 }
