import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { graphql, buildSchema } from 'graphql';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  recentSets = [];
  tournaments = [];

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.getName();
  }

  constructTournaments(){
    for(let set of this.recentSets){
      // Build list of unique tournament IDs
      if(this.tournaments.indexOf(set.event.tournament.name) == -1){
        this.tournaments.push(set.event.tournament.name);
      }
    }
    console.log(this.tournaments);
  }

  getName() {
    const playerId = 232386;

    /*
    var query = 
    `query EventEntrants($eventId: ID!,$page:Int!,$perPage:Int!){
      event(id:$eventId){
        name
        entrants(query:{
          page:$page
          perPage:$perPage
        }){
          pageInfo{
            total
            totalPages
          }
          nodes{
            id
            participants{
              gamerTag
              playerId
            }
          }
        }
      }
    }`;
    */
    
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
      console.log(this.recentSets);
      this.constructTournaments();
    });
  }

}
