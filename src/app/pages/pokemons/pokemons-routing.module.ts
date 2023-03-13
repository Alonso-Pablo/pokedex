import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokemonsComponent } from './pokemons.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PokemonsComponent,
      },
      {
        path: ':id',
        component: PokemonComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
