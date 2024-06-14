import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-mesagge-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMesaggeBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMesaggeBoxComponent {


  @Input() placeholder: string ='';
  @Input() disableCorrections: boolean = false;

  @Output() onMessage = new EventEmitter<string>();

  public fb = inject(FormBuilder)
  public form = this.fb.group({
    prompt:['',Validators.required]
  });


  handleSubmit(){
    if(this.form.invalid) return;

    const{ prompt } = this.form.value;

    this.onMessage.emit(prompt ?? '');


    this.form.reset();
  }

 }
