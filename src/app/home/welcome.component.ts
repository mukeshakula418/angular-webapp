import { Component } from '@angular/core';

@Component({
  selector:'welcome-navbar',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public pageTitle = 'Home';
}
