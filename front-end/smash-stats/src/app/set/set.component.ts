import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
  private _setStats: JSON;
  private _results = '';

  constructor() {}

  ngOnInit() {
  }

  @Input()
  set setStats(setStats: JSON) {
    this._setStats = setStats;
    this._results = setStats['displayScore'];
  }

  get setStats(): JSON {
    return this._setStats;
  }

  get results(): string {
    return this._results;
  }

}
