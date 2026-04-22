import { Component, input } from '@angular/core';
import { PetModel } from '../../models/pets';

@Component({
  selector: 'app-pet-card',
  imports: [],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.css',
})
export class PetCard {
  pet = input.required<PetModel>();
}
