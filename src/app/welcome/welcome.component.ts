import { Component } from '@angular/core';
import { HubConnectionService } from '../hub-connection/hub-connection.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private hub: HubConnectionService) { }

  register(name: string): void{
    this.hub.register(name);
  }
}
