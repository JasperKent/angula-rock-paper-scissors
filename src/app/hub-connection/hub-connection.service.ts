import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Drawn, GameStatus, Pending, Won } from './messages';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {
 
  private playerName = "";

  status$?: Observable<GameStatus>;
  outcome$?: Observable<{type: string, value: Pending | Drawn | Won }>;

  constructor() { 
   
  }

  register(name: string): void {
    this.playerName = name;

  }

  throw(group: string, selection: 'Rock' | 'Paper' | 'Scissors') {
   
  }
}
