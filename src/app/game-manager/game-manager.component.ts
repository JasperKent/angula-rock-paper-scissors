import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HubConnectionService } from '../hub-connection/hub-connection.service';
import { GameStatus } from '../hub-connection/messages';

@Component({
  selector: 'app-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss']
})
export class GameManagerComponent {

  get status$(): Observable<GameStatus> | undefined {
    return undefined;
  }

  constructor(public hub: HubConnectionService) { }
}
