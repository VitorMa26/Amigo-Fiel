import { Component, inject, OnInit, signal } from '@angular/core';
import { Pet } from '../../services/pet';
import { PetModel } from '../../models/pets';
import { PetCard } from '../../components/pet-card/pet-card';

@Component({
  selector: 'app-pet-list',
  imports: [PetCard],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit {
  private petService = inject(Pet);
  pets = signal<PetModel[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.petService.getAll().subscribe({
      next: (res) => {
        this.loading.set(false);
        this.pets.set(res);
      },
    });
  }
}
