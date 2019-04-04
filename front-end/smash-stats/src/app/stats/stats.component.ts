import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { graphql, buildSchema } from 'graphql';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getName();
  }

  getName() {
    const name = this.route.snapshot.paramMap.get('playerName');
    
    var schema = buildSchema(`
      type Query {
        SetsByPlayer($playerId: ID!) {
          player(gamerTag: `+name+`) {
            id
          }
        }
      }
    `)
  }

}
