import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  constructor(public auth: AuthService) {}
}
