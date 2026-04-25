import { Component, inject, OnInit, signal } from '@angular/core';
import { Pet } from '../../../services/pet';
import { PetModel } from '../../../models/pets';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private petService = inject(Pet);
  public pets = signal<PetModel[]>([]);

  ngOnInit(): void {
    this.petService.getAll('').subscribe({
      next: (res) => {
        console.log(res);
        this.pets.set(res);
      },
    });
  }
}
