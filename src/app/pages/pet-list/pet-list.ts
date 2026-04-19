import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../../services/pet';

@Component({
  selector: 'app-pet-list',
  imports: [],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit {
  private petService = inject(Pet);
  public pet: any[] = [];

  ngOnInit(): void {
    this.petService.getAll().subscribe({
      next: (res) => {
        this.pet = res;
      },
    });
  }
}
