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
  specieFilter = 'todos';
  filteredList = signal<PetModel[]>([]);

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
    const newList = this.pets().filter((item) =>
      item.name.toLowerCase().includes(this.nameFilter.toLowerCase()),
    );
    this.filteredList.set(newList);
    if (this.nameFilter.length == 0) {
      this.filteredList.set(this.pets());
    }
  }
}
