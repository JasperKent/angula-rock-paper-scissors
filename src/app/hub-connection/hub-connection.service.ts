import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignalrClient, SignalrConnection } from 'ngx-signalr-websocket';
import { merge, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Drawn, GameStatus, Pending, Won } from './messages';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {
 
  private connection?: SignalrConnection;

  private playerName = "";

  status$?: Observable<GameStatus>;
  outcome$?: Observable<{type: string, value: Pending | Drawn | Won }>;

  private setupOutcomePipe(connection: SignalrConnection): void{
    let pending$ = connection.on<[string]>('Pending').pipe(
      map(([waitingFor]) => ({waitingFor} as Pending))
    );

    let drawn$ = connection.on<[string, string]>('Drawn').pipe(
      map(([explanation, scores]) => ({explanation, scores} as Drawn))
    );

    let won$ = connection.on<[string, string, string]>('Won').pipe(
      map(([winner, explanation, scores]) => ({winner, explanation, scores} as Won))
    );

    this.outcome$ = merge(
      pending$.pipe(map(value => ({type: 'pending', value}))),
      drawn$.pipe(map(value => ({type: 'drawn', value}))),
      won$.pipe(map(value => ({type: 'won', value})))
    )
  }

  private setupStatusPipe(connection: SignalrConnection): void{
    let waitingForPlayer$ = connection.on<[]>('WaitingForPlayer').pipe(
      map(() => ({status: 'waiting'} as GameStatus))
    );

    let gameStarted$ = connection.on<[string, string, string]>('GameStarted').pipe(
      map(([player1, player2, group]) => ({status: 'playing', thisPlayer: this.playerName,
                                           player1, player2, group} as GameStatus))
    );

    this.status$ = merge(
      waitingForPlayer$.pipe(startWith({status: 'connected'})),
      gameStarted$
    )
  }

  constructor(httpClient: HttpClient) { 
   const client = SignalrClient.create(httpClient);

   client.connect(environment.gameHubUri).subscribe(
     connection =>{
       this.connection = connection;

       this.setupStatusPipe(connection);
       this.setupOutcomePipe(connection);
     }
   )
  }

  register(name: string): void {
    this.playerName = name;

    this.connection?.send('Register', name);

  }

  throw(group: string, selection: 'Rock' | 'Paper' | 'Scissors') {
   this.connection?.send('Throw', group, this.playerName, selection);
  }
}
