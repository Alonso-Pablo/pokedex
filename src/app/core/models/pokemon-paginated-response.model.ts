import { Pokemon } from './pokemon.model';

export interface PokemonPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  pokemons: Pokemon[]
}
