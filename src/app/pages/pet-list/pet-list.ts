import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../../services/pet';
import { NgClass } from '@angular/common';
import { PetModel } from '../../models/pets';

@Component({
  selector: 'app-pet-list',
  imports: [NgClass],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit {
  private petService = inject(Pet);
  public pets: PetModel[] = [];

  ngOnInit(): void {
    this.petService.getAll().subscribe({
      next: (res) => {
        this.pets = res;
      },
    });
  }
}
