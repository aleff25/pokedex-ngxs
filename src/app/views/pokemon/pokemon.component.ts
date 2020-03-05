import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {DeletePokemon, LoadPokemons, UpdatePokemon} from '../../shared/states/pokemon';
import {Pokemon} from '../../shared/interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonComponent implements OnInit {

  public pokemon: Pokemon;
  @Select(state => state.pokemon) pokemons$;

  constructor(private store: Store) {
    this.store.dispatch(new LoadPokemons());
  }

  ngOnInit() {
  }

  onDelete(pokemon: Pokemon) {
    this.store.dispatch(new DeletePokemon(pokemon.id));
  }

  onSelect(pokemon: Pokemon) {
    this.pokemon = pokemon;
  }

  onUpdate(pokemon: Pokemon) {
    this.store.dispatch(new UpdatePokemon(pokemon));
  }
}
