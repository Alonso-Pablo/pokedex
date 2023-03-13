import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../../../core/models/pokemon.model';
import { PokemonService } from '../../../../core/services/pokemon.service';

@Component({
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [ PokemonService ],
})
export class PokemonComponent implements OnInit {
  pokemonId!: string;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    types: [],
    height: 0,
    weight: 0,
    sprites: [],
  };
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.pokemonId = this.route.snapshot.paramMap.get('id')!;
    this.pokemonService
      .findOne(this.pokemonId)
      .subscribe((pokemon: Pokemon) => this.pokemon = pokemon);
  }

}
