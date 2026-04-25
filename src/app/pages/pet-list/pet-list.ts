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
  sizeFilter = signal('Todos');

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.loading.set(true);
    const nameParam = this.nameFilter.length == 0 ? '' : 'name=' + this.nameFilter;
    const specieParam =
      this.specieFilter().length == 0 || this.specieFilter() == 'Todos'
        ? ''
        : 'species=' + this.specieFilter();
    const sizeParam =
      this.sizeFilter().length == 0 || this.sizeFilter() == 'Todos'
        ? ''
        : 'size=' + this.sizeFilter();
    const buildParams = [nameParam, specieParam, sizeParam].filter((e) => e.length != 0).join('&');
    const queryParams = buildParams.length == 0 ? '' : '?' + buildParams;
    this.petService.getAll(queryParams).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.pets.set(res);
      },
      error: (err) => {
        this.loading.set(false);
      },
    });
  }
}
