import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import { SendMatchesService } from './send-matches.service';
import { HelloWorldService } from './hello-world.service';
import { CreateBracketService } from './create-bracket.service';

export interface PeriodicElement {
  name: string;
  position: number;
  score: number;
  
}

interface Match {
  Member1:     string;
	Member2:     string;
	Member1Wins: number;
	Member2Wins: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Gators', score: 100.79},
  {position: 2, name: 'Bucks', score: 90.26},
  {position: 3, name: 'Packers', score: 69.41},
  {position: 4, name: 'Blue Devils', score: 59.0122},
  {position: 5, name: 'Honey Badgers', score: 51.0811},
  
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [SendMatchesService]
})
export class AppComponent implements OnInit {
  title = 'brackets-app';
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  Teams:string = "";
  TeamsList: string[] | undefined;
  MatchList: Match[] | undefined;




  FinalsList = [
    { Member1: 'Team 1', Member2: 'Team 2', Member1Wins: 2, Member2Wins: 1 },
    { Member1: 'Team 3', Member2: 'Team 4', Member1Wins: 0, Member2Wins: 2 },
    { Member1: 'Team 5', Member2: 'Team 6', Member1Wins: 1, Member2Wins: 2 },
    { Member1: 'Team 7', Member2: 'Team 8', Member1Wins: 2, Member2Wins: 0 }
  ];
  
  SemifinalsList = [
    { Member1: 'Team 1', Member2: 'Team 3', Member1Wins: 2, Member2Wins: 0 },
    { Member1: 'Team 5', Member2: 'Team 7', Member1Wins: 1, Member2Wins: 2 }
  ];
  
  WinnersList = [
    { Member1: 'Team 1', Member2: 'Team 7', Member1Wins: 2, Member2Wins: 0 }
  ];
  






  constructor(private hw: HelloWorldService, private cbs: CreateBracketService) {}

  ngOnInit() {
    
    // Read from getTitle which is on backend API. Convert back from JSON into a struct
    this.TeamsList = this.cbs.getTeamsList();
    this.MatchList = this.cbs.getMatchList();
  }

  @ViewChild('roundsInput')
  roundsInputReference!: ElementRef;

  createBracket() {
    this.cbs.createBracket(
      this.roundsInputReference.nativeElement.value
    );
    this.ngOnInit();
  }
  createPairings(){
    this.cbs.createPairings();
  }

  getTeamsList() {
    for (let i = 0; i < this.cbs.getTeamsList().length; i++) {
      console.log(this.cbs.getTeamsList()[i]);
    }
    return this.cbs.getTeamsList();
  }
}
