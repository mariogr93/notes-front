import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'custom-input-component',
  // templateUrl:"./custom-input.component.html",
  template: `<div class="input-container">
    <label for="firstName" class="input-label">{{label}}</label>
    <input
      class="input"
      type="text"
      name="inputValue"
      id="inputValue"
      

      [class.error-container]="
      inputValue.invalid &&
        (inputValue.touched || inputValue.dirty)
      "
    />
    <div
      *ngIf="
      inputValue.invalid &&
        (inputValue.touched || inputValue.dirty)
      "
    >
      <span class="error-msg" *ngIf="inputValue.hasError('required')"
        >The {{label}} is required</span
      >
    </div>
  </div>`,
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent implements OnInit{
   

    @Input() label: string = '';

    inputValue = new FormControl('', [Validators.required])

    @Output() valueEmitter = new EventEmitter<string>();


    ngOnInit(): void {
        this.inputValue.valueChanges.subscribe(value => console.log(value))
    }
}
