import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayingComponent } from './playing/playing.component';
import { HttpClientModule } from '@angular/common/http';
import { GameManagerComponent } from './game-manager/game-manager.component'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PlayingComponent,
    GameManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
