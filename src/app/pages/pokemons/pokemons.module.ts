import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsComponent } from './pokemons.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailsCardComponent } from './pages/pokemon/components/pokemon-details-card/pokemon-details-card.component';


@NgModule({
  declarations: [
    PokemonsComponent,
    PokemonComponent,
    PokemonCardComponent,
    PokemonDetailsCardComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule
  ]
})
export class PokemonsModule { }
