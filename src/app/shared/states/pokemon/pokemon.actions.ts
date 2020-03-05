import {Pokemon} from '../../interfaces/pokemon.interface';

export class AddPokemon {
  static readonly type = '[Pokemon] add';

  constructor(public pokemon: Pokemon) {}
}

export class AddSuccessPokemon {
  static readonly type = '[Pokemon] add success';

  constructor(public pokemon: Pokemon) {}
}

export class AddFailedPokemon {
  static readonly type = '[Pokemon] add failed';

  constructor(public message: string) {}
}

export class LoadPokemons {
  static readonly type = '[Pokemon] load pokemon';
}

export class LoadSuccessPokemon {
  static readonly type = '[Pokemon] load pokemon success';

  constructor(public payload: Array<Pokemon>) {}
}

export class LoadFailedPokemon {
  static readonly type = '[Pokemon] load pokemon failed';

  constructor(public message: string) {}
}

export class UpdatePokemon {
  static readonly type = '[Pokemon] update';

  constructor(public pokemon: Pokemon) {}
}

export class UpdateSuccessPokemon {
  static readonly type = '[Pokemon] update pokemon success';

  constructor(public pokemon: Pokemon) {}
}

export class UpdateFailedPokemon {
  static readonly type = '[Pokemon] update pokemon failed';

  constructor(public message: string) {}
}

export class DeletePokemon {
  static readonly type = '[Pokemon] delete';

  constructor(public id: number) {}
}

export class DeleteSuccessPokemon {
  static readonly type = '[Pokemon] delete pokemon success';

  constructor(public id: number) {}
}

export class DeleteFailedPokemon {
  static readonly type = '[Pokemon] delete pokemon failed';

  constructor(public message: string) {}
}
