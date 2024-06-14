import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageEvent, TextMessageBoxFileComponent } from '@Components/index';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { AudioToTextResponse } from '../../../interfaces/audio-to-text-response';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxFileComponent
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  handleMessageWithFile( {prompt, file}: TextMessageEvent){
    const text = prompt ?? file.name ?? 'Traduce el audio';

    this.isLoading.set(true);

    this.messages.update (prev => [...prev, {isGpt:false, text: text}]);

    this.openAiService.audioToText( file, text )
    .subscribe( resp => this.handleResponse(resp));
  }


  handleResponse( resp:AudioToTextResponse |null ){
    this.isLoading.set(false);

    if( !resp )return;

    const text = `## Transcripción:
    __Duración__ ${Math.round( resp.duration )} segundos.

    ## El texto es.
    ${resp.text}
    `;
    this.messages.update(prev => [...prev, {isGpt:true, text: text}]);

    for(const segment of resp.segments){
      const segmentMessage = `
      __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
      ${ segment.text }
      `;

    this.messages.update(prev => [...prev, {isGpt:true, text: segmentMessage}]);

    }
  }


 }
