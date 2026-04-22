import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Pet } from '../../services/pet';
import { PetModel } from '../../models/pets';
import { PetCard } from '../../components/pet-card/pet-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pet-list',
  imports: [PetCard, FormsModule],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit {
  private petService = inject(Pet);
  pets = signal<PetModel[]>([]);
  loading = signal(true);
  nameFilter = '';
  specieFilter = signal('Todos');
  filteredList = signal<PetModel[]>([]);
  sizeFilter = signal('Todos');

  ngOnInit(): void {
    this.petService.getAll().subscribe({
      next: (res) => {
        this.loading.set(false);
        this.pets.set(res);
        this.filteredList.set(res);
      },
    });
  }

  filterResults() {
    let newList = this.pets().filter((item) =>
      item.name.toLowerCase().includes(this.nameFilter.toLowerCase()),
    );

    if (this.nameFilter.length == 0) {
      newList = this.pets();
    }

    if (this.specieFilter() !== 'Todos') {
      newList = newList.filter((item) => item.species == this.specieFilter());
    }

    if (this.sizeFilter() !== 'Todos') {
      newList = newList.filter((item) => item.size == this.sizeFilter());
    }

    this.filteredList.set(newList);
  }
}
