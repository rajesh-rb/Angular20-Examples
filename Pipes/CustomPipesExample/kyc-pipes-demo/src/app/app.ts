import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Kyc } from './kyc/kyc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Kyc],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kyc-pipes-demo');
}
