import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  private _name = '';

  constructor() {}

  ngOnInit() {
  }

  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no tournament name>';
  }

  get name(): string {
    return this._name;
  }

}
