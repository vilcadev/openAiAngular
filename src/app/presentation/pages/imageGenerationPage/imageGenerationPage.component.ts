import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMesaggeBoxComponent } from '@Components/index';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMesaggeBoxComponent
  ],
  templateUrl: './imageGenerationPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessage(prompt:string){
    this.isLoading.set(true);
    this.messages.update( prev => [...prev, { isGpt:false,text: prompt }] );

    this.openAiService.imageGeneration(prompt)
    .subscribe(resp =>{
    this.isLoading.set(false);

      if(!resp)return;

      this.messages.update(prev =>[
        ...prev,
        {
          isGpt:true,
          text:resp.alt,
          imageInfo:resp,
        }
      ])
    })

  }
 }
