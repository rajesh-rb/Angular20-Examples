import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-form-with-all-controls',
  imports: [ReactiveFormsModule],
  templateUrl: './form-with-all-controls.html',
  styleUrl: './form-with-all-controls.css',
})
export class FormWithAllControls {

  countries = ['USA', 'Canada', 'UK', 'Australia'];
  skillList = ['Angular', 'React', 'Vue', 'Svelte'];

  exForm=new FormGroup({
 name: new FormControl(''),
 email: new FormControl<string>('',{
  nonNullable: true,
  validators:[]
 }),

  })
}
