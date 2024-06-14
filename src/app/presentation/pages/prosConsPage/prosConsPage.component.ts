import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMesaggeBoxComponent } from '@Components/index';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMesaggeBoxComponent
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessage(prompt:string){
    // Mostramos al Usuario su mensaje que envió
    this.messages.update( (prev)=>[
      ...prev,
      {
        isGpt:false,
        text:prompt
      }
    ]);

    this.isLoading.set(true);

    this.openAiService.prosConsDiscusser(prompt)
    .subscribe(resp => {
      this.isLoading.set(false);
      this.messages.update(prev =>[
        ...prev,
        {
          isGpt:true,
          text:resp.content
        }
      ])
    })

  }
}
