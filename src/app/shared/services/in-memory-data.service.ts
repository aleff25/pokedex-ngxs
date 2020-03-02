import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {pokemons as pokemonDB} from '../mock/pokemon';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const pokemons = pokemonDB;
    return {pokemons};
  }

  genId(): number {
    return Math.round(Math.random() * 1000000);
  }
}
