import {Action, State, StateContext} from '@ngxs/store';
import {Pokemon} from '../../interfaces/pokemon.interface';
import {
  AddFailedPokemon,
  AddSuccessPokemon,
  DeleteSuccessPokemon,
  LoadFailedPokemon,
  LoadPokemons,
  LoadSuccessPokemon,
  UpdateSuccessPokemon
} from './pokemon.actions';
import {append, patch} from '@ngxs/store/operators';
import {Observable} from 'rxjs';
import {PokemonService} from '../../services/pokemon.service';
import {pokemons} from '../../mock/pokemon';
import {catchError, map} from 'rxjs/operators';

export interface PokemonStateModel {
  ids: number[];
  entities: { [key: string]: Pokemon };
}

function arrayToObject(array) {
  return array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
}

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: {
    ids: [],
    entities: {}
  }
})
export class PokemonState {

  constructor(private pokemonService: PokemonService) {
  }

  @Action(LoadPokemons)
  loadAllPokemons$(context: StateContext<PokemonStateModel>): Observable<any> {
    return this.pokemonService.getAll().pipe(
      map(pokes => context.dispatch(new LoadSuccessPokemon(pokes))),
      catchError(err => context.dispatch(new LoadFailedPokemon(err)))
    );
  }

  @Action(LoadSuccessPokemon)
  loadSuccessPokemon({patchState}: StateContext<PokemonStateModel>, {payload}: LoadSuccessPokemon) {
    patchState({
      entities: arrayToObject(payload)
    });
  }

  @Action(LoadPokemons)
  addPokemon$(context: StateContext<PokemonStateModel>, {payload}: any): Observable<any> {
    return this.pokemonService.add(payload).pipe(
      map(poke => context.dispatch(new AddSuccessPokemon(poke))),
      catchError(err => context.dispatch(new AddFailedPokemon(err)))
    );
  }

  @Action(AddSuccessPokemon)
  addSuccessPokemon(context: StateContext<PokemonStateModel>, {pokemon}: AddSuccessPokemon) {
    const state = context.getState();
    context.setState({
      ...state,
      ids: [...state.ids, pokemon.id],
      entities: {...state.entities, [pokemon.id]: pokemon}
    });
  }

  @Action(LoadPokemons)
  deletePokemon$(context: StateContext<PokemonStateModel>, {payload}: any): Observable<any> {
    return this.pokemonService.delete(payload).pipe(
      map(poke => context.dispatch(new DeleteSuccessPokemon(poke.id))),
      catchError(err => context.dispatch(new AddFailedPokemon(err)))
    );
  }

  @Action(DeleteSuccessPokemon)
  deleteSuccessPokemon({getState, patchState}: StateContext<PokemonStateModel>, {id}: DeleteSuccessPokemon) {
    const entities = getState().entities;
    delete entities[id];
    patchState(entities);
  }

  @Action(LoadPokemons)
  updatePokemon$(context: StateContext<PokemonStateModel>, {payload}: any): Observable<any> {
    return this.pokemonService.update(payload).pipe(
      map(poke => context.dispatch(new DeleteSuccessPokemon(poke.id))),
      catchError(err => context.dispatch(new AddFailedPokemon(err)))
    );
  }

  @Action(UpdateSuccessPokemon)
  updateSuccessPokemon({setState}: StateContext<PokemonStateModel>, {pokemon}: UpdateSuccessPokemon) {
    setState(
      patch<PokemonStateModel>({
        ids: append([pokemon.id]),
        entities: patch({[pokemon.id]: pokemon})
      })
    );
  }
}
