import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-details-card',
  templateUrl: './pokemon-details-card.component.html',
  styleUrls: ['./pokemon-details-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailsCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
