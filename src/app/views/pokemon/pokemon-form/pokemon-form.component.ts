import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pokemon} from '../../../shared/interfaces/pokemon.interface';
import {photos} from '../../../shared/mock/pokemon.photos';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonFormComponent implements OnInit, OnChanges {

  pokeForm: FormGroup;
  photos = photos;
  @Input() pokemon: Pokemon = {} as Pokemon;
  @Output() add: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  @Output() update: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm(this.pokemon);
  }

  ngOnChanges() {
    this.initForm(this.pokemon);
  }

  private initForm(pokemon: Partial<Pokemon> = {}) {
    this.pokeForm = this.formBuilder.group({
      name: [pokemon.name, Validators.required],
      description: [pokemon.description, Validators.required],
      height: [pokemon.height, Validators.required],
      weight: [pokemon.weight, Validators.required],
      photo: [pokemon.photo, Validators.required]
    });
  }

  public addPokemon() {
    const pokemon: Pokemon = {...this.pokeForm.value};
    this.add.emit(pokemon);
    this.initForm();
  }

  public updatePokemon() {
    const pokemon = {
      ...this.pokemon,
      ...this.pokeForm.value
    };

    this.update.emit(pokemon);
    this.initForm();
  }
}
