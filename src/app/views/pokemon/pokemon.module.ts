import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import {PokemonFormComponent} from './pokemon-form/pokemon-form.component';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokemonRouting} from './pokemon.routing';



@NgModule({
  declarations: [
    PokemonComponent,
    PokemonFormComponent,
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    PokemonRouting
  ]
})
export class PokemonModule { }
