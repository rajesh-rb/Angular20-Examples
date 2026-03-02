import { Component } from '@angular/core';

// Imports RouterLink directive, which allows
// this component’s template to perform route-based navigation
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
