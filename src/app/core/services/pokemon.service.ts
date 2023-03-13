import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PokemonPaginatedResponse } from '../models/pokemon-paginated-response.model';
import { Pokemon } from '../models/pokemon.model';

interface PaginationOptions {
  limit?: number,
  offset?: number,
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private backend_url = environment.backendUrl;

  constructor(
    private http: HttpClient
  ) {}

  find(paginationOptions?: PaginationOptions): Observable<PokemonPaginatedResponse> {
    const limit = paginationOptions?.limit || 20;
    const offset = paginationOptions?.offset || 0;
    return this.http.get<PokemonPaginatedResponse>(
      `${this.backend_url}/pokemons?limit=${limit}&offset=${offset}`,
    )
  }

  findOne(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${this.backend_url}/pokemons/${id}`,
    )
  }
}
