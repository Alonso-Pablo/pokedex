import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonPaginatedResponse } from '../../core/models/pokemon-paginated-response.model';
import { Pokemon } from '../../core/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  limit: number = 0;
  offset: number = 0;
  isFirstPage: boolean = false;
  isLastPage: boolean = false;
  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.limit = Number(params['limit']) || 0;
      this.offset = Number(params['offset']) || 0;
    })

    this.pokemonService
      .find({ limit: this.limit, offset: this.offset})
      .subscribe(({ pokemons, previous, next }: PokemonPaginatedResponse) => {
        this.pokemons = pokemons;
        this.handleFirstPage(previous);
        this.handleLastPage(next);
      })
  }

  goNextPage(skip: number): void {
    this.offset = Number(this.offset) + Number(skip);
    this.router.navigate(['/pokemons'], { queryParams: { limit: this.limit, offset: this.offset }, replaceUrl: true})
    this.pokemonService
      .find({ limit: this.limit, offset: this.offset})
      .subscribe(({ pokemons, previous, next }: PokemonPaginatedResponse) => {
        this.pokemons = pokemons;
        this.handleFirstPage(previous);
        this.handleLastPage(next);
      })
  }

  goPreviousPage(back: number): void {
    this.offset = Number(this.offset) - Number(back);
    if (this.offset < 0) this.offset = 0;
    this.pokemonService
      .find({ limit: this.limit, offset: this.offset})
      .subscribe(({ pokemons, previous, next }: PokemonPaginatedResponse) => {
        this.pokemons = pokemons;
        this.handleFirstPage(previous);
        this.handleLastPage(next);
      })
    this.router.navigate(['/pokemons'], { queryParams: { limit: this.limit, offset: this.offset }, replaceUrl: true})
  }

  handleLastPage(linkToNextPage: string | null) {
    if (linkToNextPage === null && this.isLastPage !== true) {
      this.isLastPage = true;
    }

    if (linkToNextPage !== null && this.isLastPage === true) {
      this.isLastPage = false;
    }
  }

  handleFirstPage(linkToPreviousPage: string | null) {
    if (linkToPreviousPage === null && this.isFirstPage !== true) {
      this.isFirstPage = true;
    }

    if (linkToPreviousPage !== null && this.isFirstPage === true) {
      this.isFirstPage = false;
    }
  }
}
