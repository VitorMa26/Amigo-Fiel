import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../../../services/pet';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private petService = inject(Pet);
  public pets: any[] = [];

  ngOnInit(): void {
    this.petService.getAll().subscribe({
      next: (res) => {
        this.pets = res;
      },
    });
  }
}
