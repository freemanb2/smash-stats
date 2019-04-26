import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { graphql, buildSchema } from 'graphql';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  recentSets = [];
  tournaments = [];
  scores = new Map();
  gamertag = '';

  constructor(private route: ActivatedRoute, private httpClient:HttpClient, private router: Router) { 
  }

  ngOnInit() {
    this.getName();
    this.gamertag = this.route.snapshot.params.gamertag;
  }

  constructTournaments(){
    for(let set of this.recentSets){
      // Build list of unique tournament IDs
      if(this.tournaments.indexOf(set.event.tournament.name) == -1){
        this.tournaments.push(set.event.tournament.name);
      }
    }
    
  }

  constructHeadToHead(){
    for(let set of this.recentSets){
      // Build list of unique opponent names
      if(set.slots[1].entrant != undefined && set.event.name == "Melee Singles"){
        let theirTag = set.slots[1].entrant.name;
        if(set.winnerId == set.slots[0].entrant.id){
          //I won, so increase first value of stored array
          if(this.scores.has(theirTag)){
            this.scores.set(theirTag, 
              [this.scores.get(theirTag)[0] + 1,
              this.scores.get(theirTag)[1]
              ]);
          }
          else {
            this.scores.set(theirTag, [1,0]);
          }
        }
        else {
          //They won, so increase second value
          if(this.scores.has(theirTag)){
            this.scores.set(theirTag, 
              [this.scores.get(theirTag)[0],
              this.scores.get(theirTag)[1] + 1
              ]);
          }
          else {
            this.scores.set(theirTag, [0,1]);
          }
        }
      }
    }
    console.log(this.scores);
  }

  getName() {
    const gamertag = this.route.snapshot.params.gamertag;
    var playerId;
    
    this.httpClient.get(`http://localhost:5000/api/user/${gamertag}`, {
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      playerId = response.body;
      var query = 
      `query SetsByPlayer($playerId: ID!) {
        player(id: $playerId) {
          id
          gamerTag
          recentSets{
            id
            phaseGroupId
            event{
              name
              tournament{
                name
              }
            }
            displayScore
            slots {
              entrant {
                id
                name
              }
            }
            winnerId
          }
        }
      }`;
      
          
      fetch('https://api.smash.gg/gql/alpha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer 9eeed862a5bf1d999a6d8f60d73ede70'
        },
        body: JSON.stringify({
          query,
          variables: { playerId },
        })
      })
      .then(r => r.json())
      .then(data => {
        this.recentSets = data.data.player.recentSets;
        this.constructTournaments();
        this.constructHeadToHead();
      });
    })
    .catch((error) => {
      alert("No players exist with this tag");
      this.router.navigate(['/']);
    });
  }
}
