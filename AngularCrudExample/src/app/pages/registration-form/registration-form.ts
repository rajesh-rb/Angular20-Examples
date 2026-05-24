import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css',
})
export class RegistrationForm {

registrationForm=new FormGroup({
  name: new FormControl('', [Validators.required]),
  email:new FormControl('',[Validators.required, Validators.email]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  gender:new FormControl(''),
  country:new FormControl(''),
  skills:new FormControl([]),
  acceptTerms:new FormControl(false,Validators.requiredTrue),
  phones: new FormArray([
    new FormControl('')
  ])
});

get Phones(): FormArray {
  return this.registrationForm.get('phones') as FormArray;
}

addPhone(){
  this.Phones.push(new FormControl(''));
}

removePhone(index: number){
  this.Phones.removeAt(index);
}

submitForm(){
  console.log(this.registrationForm.value);
}

}
