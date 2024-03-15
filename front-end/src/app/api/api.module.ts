/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UserService } from './services/user.service';
import { RefereeService } from './services/referee.service';
import { PlaceService } from './services/place.service';
import { GameService } from './services/game.service';
import { TournamentService } from './services/tournament.service';
import { CaptainService } from './services/captain.service';
import { RoundService } from './services/round.service';
import { AuthService } from './services/auth.service';
import { UploadCoverTournamentService } from './services/upload-cover-tournament.service';
import { TeamService } from './services/team.service';
import { PlayerService } from './services/player.service';
import { OpenGetService } from './services/open-get.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserService,
    RefereeService,
    PlaceService,
    GameService,
    TournamentService,
    CaptainService,
    RoundService,
    AuthService,
    UploadCoverTournamentService,
    TeamService,
    PlayerService,
    OpenGetService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
