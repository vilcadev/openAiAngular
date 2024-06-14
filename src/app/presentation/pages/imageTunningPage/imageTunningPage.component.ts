import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMesaggeBoxComponent, GptMessageEditableImageComponent } from '@Components/index';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMesaggeBoxComponent,
    GptMessageEditableImageComponent
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {

  public messages = signal<Message[]>([
    // {
    //   isGpt:true,
    //   text:'Dummy image',
    //   imageInfo: {
    //     alt:'Dummy image',
    //     url:'http://localhost:3000/gpt/image-generation/1711859227649.png'
    //   }
    // }
  ]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public originalImage = signal<string | undefined>(undefined);
  public maskImage = signal<string | undefined>(undefined);



  handleMessage(prompt:string){
    this.isLoading.set(true);
    this.messages.update( prev => [...prev, { isGpt:false,text: prompt }] );

    this.openAiService.imageGeneration(prompt,this.originalImage(), this.maskImage())
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

  handleImageChange(newImage: string, originalImage:string){
    this.originalImage.set(originalImage);
    this.maskImage.set(newImage);

  }

  generatedVariation(){
    if(!this.originalImage) return;
    this.isLoading.set(true);
    this.openAiService.imageVariation( this.originalImage()! ).subscribe(resp =>{
      this.isLoading.set(false);
      if(!resp) return;

      this.messages.update(prev =>[
        ...prev,
        {
          isGpt:true,
          text:resp.alt,
          imageInfo:resp
        }
      ]);
    })

  }
}
