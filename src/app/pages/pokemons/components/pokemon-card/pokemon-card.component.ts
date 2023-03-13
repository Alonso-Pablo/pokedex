import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent implements OnInit {
  @Input()
  pokemon: Pokemon = {
    id: 0,
    name: '',
    types: [],
    height: 0,
    weight: 0,
    sprites: []
  }

  pokemonDetails: string = '/pokemon'

  constructor() {}

  ngOnInit(): void {
    this.pokemonDetails = `/pokemons/${this.pokemon.id}`
  }

}
