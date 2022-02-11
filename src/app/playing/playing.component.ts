import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HubConnectionService } from '../hub-connection/hub-connection.service';
import { Drawn, GameStatus, Pending, Won } from '../hub-connection/messages';

interface Output{
  line1: string;
  line2?: string;
  scores?: string;
}

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  @Input()
  game!: GameStatus;

  opponent? = '';
  currentThrow = '';

  private processPending(pending: Pending): Output{
    return {
      line1 : pending.waitingFor == this.game.thisPlayer 
                          ? 'Your opponent has chosen ...' 
                          :`Waiting for ${pending.waitingFor}`
    };
  }

  private processDrawn(drawn: Drawn): Output{
    this.currentThrow = '';

    return {
      line1: 'Draw',
      line2: drawn.explanation,
      scores: drawn.scores
    };
  }

  private processWon(won: Won): Output{
    this.currentThrow = '';

    return {
      line1: won.winner == this.game.thisPlayer ? 'You won!' : `${won.winner} won.`,
      line2: won.explanation,
      scores: won.scores
    };
  }

  output$: Observable<Output> | undefined = undefined;

  constructor(private hub: HubConnectionService) { }

  ngOnInit(): void {
    this.opponent = this.game.player1 === this.game.thisPlayer ? this.game.player2 : this.game.player1;
  }

  throw(selection: 'Rock' | 'Paper' | 'Scissors'): void {
    this.currentThrow = selection;
    this.hub.throw(this.game.group!, selection);
  }
}
