import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-stream-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageStreamBox.component.html',
  styles:`

  .btn-danger{
    @apply bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-700 transition-all duration-200 ease-in-out;
  }
  .btn-danger:disabled{
    @apply bg-red-500 text-white font-bold py-2 px-4 rounded-xl opacity-50 cursor-not-allowed
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageStreamBoxComponent {

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

  @Output() onAbort = new EventEmitter();

  handleAbort(){
    this.onAbort.emit();
  }

 }
